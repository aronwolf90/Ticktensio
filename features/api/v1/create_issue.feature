Feature: API: create an issue

  @javascript
  Scenario: POST /api/v1/issues with valid data
    Given a test-organization exists and is loaded
    And I set headers:
     | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
     | Content-Type | application/vnd.api+json |
    When I send a POST request to "/api/v1/issues" with the following:
      """
      {
        "data": {
          "attributes": { 
            "title": "title",
            "description": "description"
          },
          "relationships": {
            "project": {
              "data": {
                "id": 1,
                "type": "projects"
              }
            }
          }
        }
      }
      """
    Then the response status should be "201"
    And the JSON response should match:
    """
    {
      "data": {
        "id": "13",
        "type": "issues",
        "attributes": {
          "title": "title",
          "description": "description",
          "complexity": null,
          "due-at": null,
          "deadline-at": null,
          "status": "none",
          "created-at": "<.*>"
        },
        "relationships": {
          "user": { 
            "data": null
          },
          "labels": {
            "data": []
          },
          "created-by": {
            "data": {
              "id": "1",
              "type": "users"
            }
          },
          "board-list": {
            "data": {
              "id": "4",
              "type": "board-lists"
            }
          },
          "project": {
            "data": {
              "id": "1",
              "type": "projects"
            }
          }
        },
        "links": {
          "self": "/api/v1/issues/13"
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
