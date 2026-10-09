import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def get_demo_creator_cookie():
    res = client.post("/auth/login/demo", json={"role": "creator"})
    assert res.status_code == 200
    return res.cookies

def get_demo_brand_cookie():
    res = client.post("/auth/login/demo", json={"role": "brand"})
    assert res.status_code == 200
    return res.cookies

def test_shortlist_and_messaging_workflow():
    creator_cookies = get_demo_creator_cookie()
    brand_cookies = get_demo_brand_cookie()

    # 1. Fetch valid creator ID and shortlist
    creators = client.get("/creators").json()["creators"]
    assert len(creators) > 0
    target_creator_id = creators[0]["id"]

    res_sl = client.post(f"/creators/{target_creator_id}/shortlist", cookies=brand_cookies)
    if res_sl.status_code != 201:
        print("DEBUG res_sl:", res_sl.status_code, res_sl.json())
    assert res_sl.status_code == 201

    assert res_sl.json()["status"] == "ok"

    # 2. Brand retrieves shortlist
    res_get_sl = client.get("/creators/me/shortlist", cookies=brand_cookies)
    assert res_get_sl.status_code == 200
    shortlisted = res_get_sl.json()
    assert any(c["id"] == target_creator_id for c in shortlisted)

    # 3. Brand removes shortlist
    res_del_sl = client.delete(f"/creators/{target_creator_id}/shortlist", cookies=brand_cookies)
    assert res_del_sl.status_code == 200


    # 4. Creator applies to an open brief
    briefs = client.get("/briefs").json()
    assert len(briefs) > 0
    target_brief_id = briefs[0]["id"]

    app_res = client.post(f"/briefs/{target_brief_id}/apply", json={
        "pitch": "Custom AI animation pitch with Midjourney and Runway Gen-3",
        "proposed_rate_inr": 25000,
        "estimated_days": 4
    }, cookies=creator_cookies)
    assert app_res.status_code in [201, 400]

    # Get application list
    my_apps = client.get("/briefs/applications/my", cookies=creator_cookies).json()
    assert len(my_apps) > 0
    target_app_id = my_apps[0]["id"]

    # 5. Post message as Creator
    msg_res = client.post(f"/briefs/applications/{target_app_id}/messages", json={
        "text": "Hello Brand Team, here is my initial concept breakdown."
    }, cookies=creator_cookies)
    assert msg_res.status_code == 201
    assert msg_res.json()["text"] == "Hello Brand Team, here is my initial concept breakdown."

    # 6. Fetch messages as Brand
    get_msgs = client.get(f"/briefs/applications/{target_app_id}/messages", cookies=brand_cookies)
    assert get_msgs.status_code == 200
    messages = get_msgs.json()
    assert len(messages) >= 1

    # 7. Invalid URL validation on deliverable submit
    bad_deliver = client.post(f"/briefs/applications/{target_app_id}/deliver", json={
        "delivery_url": "invalid_url_without_http",
        "delivery_notes": "Test invalid url"
    }, cookies=creator_cookies)
    assert bad_deliver.status_code == 400

    # Valid URL deliverable submit
    valid_deliver = client.post(f"/briefs/applications/{target_app_id}/deliver", json={
        "delivery_url": "https://vimeo.com/test-deliverable-123",
        "delivery_notes": "Final 4K renders ready"
    }, cookies=creator_cookies)
    assert valid_deliver.status_code == 200
    assert valid_deliver.json()["status"] == "delivered"
