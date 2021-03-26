Feature: API: list issues

@javascript
Scenario: Get /api/v1/record_days
  Given a test-organization exists and is loaded
  And I set headers:
   | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
   | Content-Type | application/vnd.api+json |
  And I send a GET request to "/api/v1/project_record_days?project_id=1"
  Then the JSON response should match:
    """
    {
      "data": [
        {
          "id": "<.+>",
          "type": "project-record-days",
          "attributes": {
            "day": "<.+>",
            "spent-time": 0
          },
          "relationships": {
            "project": {
              "data": {
                "id": "1",
                "type": "projects"
              }
            },
            "records": {
              "data": [
              ]
            }
          },
          "meta": {
            "permissions": {
              "update": false,
              "destroy": false
            }
          }
        },
        {
          "id": "<.+>",
          "type": "project-record-days",
          "attributes": {
            "day": "<.+>",
            "spent-time": 7200
          },
          "relationships": {
            "project": {
              "data": {
                "id": "1",
                "type": "projects"
              }
            },
            "records": {
              "data": [
                {
                  "id": "2",
                  "type": "records"
                }
              ]
            }
          },
          "meta": {
            "permissions": {
              "update": false,
              "destroy": false
            }
          }
        },
        {
          "id": "<.+>",
          "type": "project-record-days",
          "attributes": {
            "day": "<.+>",
            "spent-time": 5400
          },
          "relationships": {
            "project": {
              "data": {
                "id": "1",
                "type": "projects"
              }
            },
            "records": {
              "data": [
                {
                  "id": "3",
                  "type": "records"
                }
              ]
            }
          },
          "meta": {
            "permissions": {
              "update": false,
              "destroy": false
            }
          }
        },
        {
          "id": "<.+>",
          "type": "project-record-days",
          "attributes": {
            "day": "<.+>",
            "spent-time": 72000
          },
          "relationships": {
            "project": {
              "data": {
                "id": "1",
                "type": "projects"
              }
            },
            "records": {
              "data": [
                {
                  "id": "4",
                  "type": "records"
                }
              ]
            }
          },
          "meta": {
            "permissions": {
              "update": false,
              "destroy": false
            }
          }
        },
        {
          "id": "<.+>",
          "type": "project-record-days",
          "attributes": {
            "day": "<.+>",
            "spent-time": 25200
          },
          "relationships": {
            "project": {
              "data": {
                "id": "1",
                "type": "projects"
              }
            },
            "records": {
              "data": [
                {
                  "id": "5",
                  "type": "records"
                }
              ]
            }
          },
          "meta": {
            "permissions": {
              "update": false,
              "destroy": false
            }
          }
        },
        {
          "id": "<.+>",
          "type": "project-record-days",
          "attributes": {
            "day": "<.+>",
            "spent-time": 32400
          },
          "relationships": {
            "project": {
              "data": {
                "id": "1",
                "type": "projects"
              }
            },
            "records": {
              "data": [
                {
                  "id": "6",
                  "type": "records"
                }
              ]
            }
          },
          "meta": {
            "permissions": {
              "update": false,
              "destroy": false
            }
          }
        }
      ],
      "links": {
        "self": "/api/v1/project_record_days"
      },
      "meta": {
        "count": 6
      }
    }
    """
  And the response status should be "200"
