Feature: API: get projects

@javascript
Scenario: Get
  Given a test-organization exists and is loaded
  And I set headers:
   | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
   | Content-Type | application/vnd.api+json |
  And I send a GET request to "/api/v1/projects/1"
  Then the response status should be "200"
  And the JSON response should be:
    """
    {
      "data": {
        "id": "1",
        "type": "projects",
        "attributes": {
          "name": "Test project",
          "description": "Test description"
        },
        "relationships": {
          "project-status": {
            "data": {
              "id": "1",
              "type": "project-statuses"
            }
          },
          "folder": {
            "data": {
              "id": "1",
              "type": "folders"
            },
            "links": {
              "self": "/api/v1/folders/1"
            }
          },
          "contact": {
            "data": {
              "id": "2",
              "type": "contacts"
            }
          },
          "main-responsable": {
            "data": null
          }
        },
        "links": { "self": "/api/v1/projects/1" },
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
  Scenario: get api/v1/board_lists/<id>?filter[issue][project_id]=<project_id>
  Given a test-organization exists and is loaded
  And I set headers:
   | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
   | Content-Type | application/vnd.api+json |
 And I send a GET request to "/api/v1/board_lists/1?filter[project_id]=2"
  Then the JSON response should be:
    """
    { 
      "data":{ 
        "id":"1",
        "type":"board-lists",
        "attributes":{ 
          "name":"Open",
          "kind":"open",
          "complexity": "5.0"
        },
        "relationships":{ 
          "issues":{ 
            "data":[{
              "id": "12",
              "type": "issues"
            }],
            "links":{ 
              "self":"/api/v1/board_lists/1/issues"
            }
          },
          "project":{ 
            "data": null 
          }
        },
        "links":{ 
          "self":"/api/v1/board_lists/1"
        },
        "meta":{ 
          "permissions":{ 
            "update":true,
            "destroy":false
          }
        }
      }
    }
    """
  And the response status should be "200"
