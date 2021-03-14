Feature: API: List board_lists issues

@javascript
Scenario: GET /api/v1/board_lists/<id>/issues
  Given a test-organization exists and is loaded
  And I set headers:
   | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
   | Content-Type | application/vnd.api+json |
  When I send a GET request to "/api/v1/board_lists/4/issues"
  Then the response status should be "200"
  And the JSON response should be:
    """
    { 
      "data":[ 
        { 
          "id":"4",
          "type":"issues",
          "attributes":{ 
            "title":"Test issue 4",
            "description":"description for the test issue",
            "complexity":"5.0",
            "due-at": null,
            "deadline-at": null,
            "status": "none",
            "created-at": "09-10-2020 10:10"
          },
          "relationships":{ 
            "user":{ 
              "data":null
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
          "links":{ 
            "self":"/api/v1/issues/4"
          },
          "meta":{ 
            "permissions":{ 
              "update":true,
              "destroy":true
            }
          }
        },
        { 
          "id":"3",
          "type":"issues",
          "attributes":{ 
            "title":"Test issue 3",
            "description":"description for the test issue",
            "complexity":"3.0",
            "due-at": null,
            "deadline-at": null,
            "status": "none",
            "created-at": "09-10-2020 10:10"
          },
          "relationships":{ 
            "user":{ 
              "data":null
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
          "links":{ 
            "self":"/api/v1/issues/3"
          },
          "meta":{ 
            "permissions":{ 
              "update":true,
              "destroy":true
            }
          }
        },
        { 
          "id":"2",
          "type":"issues",
          "attributes":{ 
            "title":"Test issue 2",
            "description":"description for the test issue",
            "complexity":"2.0",
            "due-at": null,
            "deadline-at": null,
            "status": "none",
            "created-at": "09-10-2020 10:10"
          },
          "relationships":{ 
            "user":{ 
              "data":{ 
                "id":"1",
                "type":"users"
              }
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
          "links":{ 
            "self":"/api/v1/issues/2"
          },
          "meta":{ 
            "permissions":{ 
              "update":true,
              "destroy":true
            }
          }
        },
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
              "data":{ 
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
		  "links": { "next": null }
    }
    """
