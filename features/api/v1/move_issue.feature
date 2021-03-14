Feature: API: move issue

@javascript
Scenario: POST /api/v1/issues/1/move
  Given a test-organization exists and is loaded
  And I set headers:
   | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
   | Content-Type | application/vnd.api+json |
  When I send a POST request to "/api/v1/issues/1/move" with the following:
    """
    {
      "board_list_id": 5,
      "issue_id": 2,
      "before_issue_id": 1
    }
    """
  Then the response status should be "200"
  And the JSON response should be:
    """
      {
        "data": {
          "id": "1",
          "type": "issues",
          "attributes": {
            "title": "Test issue 1",
            "description": "description for the test issue",
            "complexity": "2.0",
            "due-at": "10-10-2020 00:00",
            "deadline-at": "10-10-2020 00:00",
            "created-at": "09-10-2020 10:10",
            "status": "danger"
          },
          "relationships": {
            "created-by": {
              "data": {
                "id": "1",
                "type": "users"
              }
            },
            "user": {
              "data": {
                "id": "1",
                "type": "users"
              }
            },
            "board-list": {
              "data": {
                "id": "5",
                "type": "board-lists"
              }
            },
            "labels": {
              "data": [
                {
                  "id": "1",
                  "type": "labels"
                }
              ]
            },
            "project": {
              "data": {
                "id": "1",
                "type": "projects"
              }
            }
          },
          "links": {
            "self": "/api/v1/issues/1"
          },
          "meta": {
            "permissions": {
              "update": true,
              "destroy": true
            }
          }
        }
      }
    """

@javascript
Scenario: POST /api/v1/issues/1/move
  Given a test-organization exists and is loaded
  And I set headers:
   | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
   | Content-Type | application/vnd.api+json |
  When I send a POST request to "/api/v1/issues/1/move" with the following:
    """
    {
      "board_list_id": 5,
      "issue_id": 2,
      "before_issue_id": null
    }
    """
  Then the response status should be "200"
