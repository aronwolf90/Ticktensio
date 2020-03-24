Feature: API: list issues

@javascript
Scenario: Get /api/v1/project_statuses
  Given a test-organization exists and is loaded
  And I set headers:
   | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
   | Content-Type | application/vnd.api+json |
  And I send a GET request to "/api/v1/project_statuses"
  Then the response status should be "200"
  And the JSON response should be:
    """
    {
      "data":[
        {
          "id":"1",
          "type":"project-statuses",
          "attributes":{
            "name":"New",
            "initial":true,
            "display-as": "board"
          },
          "relationships":{
            "projects":{
              "data":[
                {
                  "id":"1",
                  "type":"projects"
                },
                {
                  "id":"2",
                  "type":"projects"
                }
              ]
            },
            "project-board-lists":{
              "data":[
                {
                  "id":"1",
                  "type":"project-board-lists"
                },
                {
                  "id":"2",
                  "type":"project-board-lists"
                }
              ]
            }
          },
          "links":{
            "self":"/api/v1/project_statuses/1"
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
          "type":"project-statuses",
          "attributes":{
            "name":"Active",
            "initial":false,
            "display-as":"list"
          },
          "relationships":{
            "projects":{
              "data":[
    
              ]
            },
            "project-board-lists":{
              "data":[
                {
                  "id":"3",
                  "type":"project-board-lists"
                }
              ]
            }
          },
          "links":{
            "self":"/api/v1/project_statuses/2"
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
          "type":"project-statuses",
          "attributes":{
            "name":"Archived",
            "initial":false,
            "display-as":"list"
          },
          "relationships":{
            "projects":{
              "data":[
    
              ]
            },
            "project-board-lists":{
              "data":[
                {
                  "id":"4",
                  "type":"project-board-lists"
                }
              ]
            }
          },
          "links":{
            "self":"/api/v1/project_statuses/3"
          },
          "meta":{
            "permissions":{
              "update":true,
              "destroy":true
            }
          }
        }
      ],
      "links":{
        "self":"/api/v1/project_statuses"
      }
    }
    """
