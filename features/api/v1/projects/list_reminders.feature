Feature: API: list reminders

@javascript
Scenario: Get /api/v1/projects/<id>/reminders
  Given a test-organization exists and is loaded
  And I set headers:
   | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
   | Content-Type | application/vnd.api+json |
  And I send a GET request to "/api/v1/projects/1/reminders"
  Then the JSON response should be:
    """
    { 
      "data":[ 
        { 
          "id":"1",
          "type":"issues",
          "attributes":{ 
            "title":"Test issue 1",
            "description":"description for the test issue",
            "complexity":"2.0",
            "due-at": "10-10-2020 00:00",
            "deadline-at": "10-10-2020 00:00",
            "status": "danger",
            "created-at": "09-10-2020 10:10"
          },
          "relationships":{ 
            "user":{ 
              "data": { 
                "id":"1",
                "type":"users"
              }
            },
            "labels": {
              "data": [{
                "id": "1",
                "type": "labels"
              }]
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
          "links":{ 
            "self":"/api/v1/issues/1"
          },
          "meta":{ 
            "permissions":{ 
              "update":true,
              "destroy":true
            }
          }
        }
      ],
      "links": { "self": "/api/v1/projects/1/reminders" }
    }
    """
  And the response status should be "200"
