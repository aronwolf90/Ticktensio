Feature: API: list user issues

@javascript
Scenario: Get
  Given a test-organization exists and is loaded
  And I set headers:
   | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
   | Content-Type | application/vnd.api+json |
  And I send a GET request to "/api/v1/user_issues"
  Then the JSON response should be:
    """
    { 
      "meta": {
        "count": 5
      },
      "data":[ 
        { 
          "id":"1,5",
          "type":"user-issues",
          "attributes":{ 
            "spent-time":3600,
            "start-time":"2020-02-08T23:00:00.000+01:00"
          },
          "relationships":{ 
            "user":{ 
              "data":{ 
                "id":"1",
                "type":"users"
              }
            },
            "issue":{ 
              "data":{ 
                "id":"5",
                "type":"issues"
              }
            }
          },
          "meta": {
            "permissions": {
              "update":true,
              "destroy":true
            }
          }
        },
        { 
          "id":"1,7",
          "type":"user-issues",
          "attributes":{ 
            "spent-time":12600,
            "start-time":"2020-01-04T22:30:00.000+01:00"
          },
          "relationships":{ 
            "user":{ 
              "data":{ 
                "id":"1",
                "type":"users"
              }
            },
            "issue":{ 
              "data":{ 
                "id":"7",
                "type":"issues"
              }
            }
          },
          "meta": {
            "permissions": {
              "update":true,
              "destroy":true
            }
          }
        },
        { 
          "id":"1,8",
          "type":"user-issues",
          "attributes":{ 
            "spent-time":72000,
            "start-time":"2019-11-23T04:00:00.000+01:00"
          },
          "relationships":{ 
            "user":{ 
              "data":{ 
                "id":"1",
                "type":"users"
              }
            },
            "issue":{ 
              "data":{ 
                "id":"8",
                "type":"issues"
              }
            }
          },
          "meta": {
            "permissions": {
              "update":true,
              "destroy":true
            }
          }
        },
        { 
          "id":"2,6",
          "type":"user-issues",
          "attributes":{ 
            "spent-time":25200,
            "start-time":"2019-10-26T17:00:00.000+02:00"
          },
          "relationships":{ 
            "user":{ 
              "data":{ 
                "id":"2",
                "type":"users"
              }
            },
            "issue":{ 
              "data":{ 
                "id":"6",
                "type":"issues"
              }
            }
          },
          "meta": {
            "permissions": {
              "update":true,
              "destroy":true
            }
          }
        },
        { 
          "id":"2,8",
          "type":"user-issues",
          "attributes":{ 
            "spent-time":32400,
            "start-time":"2019-10-12T15:00:00.000+02:00"
          },
          "relationships":{ 
            "user":{ 
              "data":{ 
                "id":"2",
                "type":"users"
              }
            },
            "issue":{ 
              "data":{ 
                "id":"8",
                "type":"issues"
              }
            }
          },
          "meta": {
            "permissions": {
              "update":true,
              "destroy":true
            }
          }
        }
      ],
      "links":{ 
        "self":"/api/v1/user_issues"
      }
    }
    """
  And the response status should be "200"
