Feature: API: list issues

@javascript
Scenario: Get /api/v1/issues
  Given a test-organization exists and is loaded
  And I set headers:
   | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
   | Content-Type | application/vnd.api+json |
  And I send a GET request to "/api/v1/issues"
  Then the JSON response should be:
    """
    { 
      "meta": {
        "count": 11
      },
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
            "status": "danger"
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
            "status": "none"
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
          "id":"3",
          "type":"issues",
          "attributes":{ 
            "title":"Test issue 3",
            "description":"description for the test issue",
            "complexity":"3.0",
            "due-at": null,
            "deadline-at": null,
            "status": "none"
          },
          "relationships":{ 
            "user":{ 
              "data":null
            },
            "labels": {
              "data": []
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
          "id":"4",
          "type":"issues",
          "attributes":{ 
            "title":"Test issue 4",
            "description":"description for the test issue",
            "complexity":"5.0",
            "due-at": null,
            "deadline-at": null,
            "status": "none"
          },
          "relationships":{ 
            "user":{ 
              "data":null
            },
            "labels": {
              "data": []
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
          "id":"5",
          "type":"issues",
          "attributes":{ 
            "title":"Test issue 5",
            "description":"description for the test issue",
            "complexity":"8.0",
            "due-at": null,
            "deadline-at": null,
            "status": "none"
          },
          "relationships":{ 
            "user":{ 
              "data":null
            },
            "labels": {
              "data": []
            }
          },
          "links":{ 
            "self":"/api/v1/issues/5"
          },
          "meta":{ 
            "permissions":{ 
              "update":true,
              "destroy":true
            }
          }
        },
        { 
          "id":"6",
          "type":"issues",
          "attributes":{ 
            "title":"Test issue 6",
            "description":"description for the test issue",
            "complexity":"2.0",
            "due-at": null,
            "deadline-at": null,
            "status": "none"
          },
          "relationships":{ 
            "user":{ 
              "data":null
            },
            "labels": {
              "data": []
            }
          },
          "links":{ 
            "self":"/api/v1/issues/6"
          },
          "meta":{ 
            "permissions":{ 
              "update":true,
              "destroy":true
            }
          }
        },
        { 
          "id":"7",
          "type":"issues",
          "attributes":{ 
            "title":"Test issue 7",
            "description":"description for the test issue",
            "complexity":"8.0",
            "due-at": null,
            "deadline-at": null,
            "status": "none"
          },
          "relationships":{ 
            "user":{ 
              "data":null
            },
            "labels": {
              "data": []
            }
          },
          "links":{ 
            "self":"/api/v1/issues/7"
          },
          "meta":{ 
            "permissions":{ 
              "update":true,
              "destroy":true
            }
          }
        },
        { 
          "id":"8",
          "type":"issues",
          "attributes":{ 
            "title":"Test issue 8",
            "description":"description for the test issue",
            "complexity":"1.0",
            "due-at": null,
            "deadline-at": null,
            "status": "none"
          },
          "relationships":{ 
            "user":{ 
              "data":null
            },
            "labels": {
              "data": []
            }
          },
          "links":{ 
            "self":"/api/v1/issues/8"
          },
          "meta":{ 
            "permissions":{ 
              "update":true,
              "destroy":true
            }
          }
        },
        { 
          "id":"9",
          "type":"issues",
          "attributes":{ 
            "title":"Test issue 9",
            "description":"description for the test issue",
            "complexity":"8.0",
            "due-at": null,
            "deadline-at": null,
            "status": "none"
          },
          "relationships":{ 
            "user":{ 
              "data":null
            },
            "labels": {
              "data": []
            }
          },
          "links":{ 
            "self":"/api/v1/issues/9"
          },
          "meta":{ 
            "permissions":{ 
              "update":true,
              "destroy":true
            }
          }
        },
        { 
          "id":"10",
          "type":"issues",
          "attributes":{ 
            "title":"Test issue 10",
            "description":"description for the test issue",
            "complexity":"3.0",
            "due-at": null,
            "deadline-at": null,
            "status": "none"
          },
          "relationships":{ 
            "user":{ 
              "data":null
            },
            "labels": {
              "data": []
            }
          },
          "links":{ 
            "self":"/api/v1/issues/10"
          },
          "meta":{ 
            "permissions":{ 
              "update":true,
              "destroy":true
            }
          }
        },
        { 
          "id":"11",
          "type":"issues",
          "attributes":{ 
            "title":"Test issue 11",
            "description":"description for the test issue",
            "complexity":"5.0",
            "due-at": null,
            "deadline-at": null,
            "status": "none"
          },
          "relationships":{ 
            "user":{ 
              "data":null
            },
            "labels": {
              "data": []
            }
          },
          "links":{ 
            "self":"/api/v1/issues/11"
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
        "self":"/api/v1/issues?page%5Bnumber%5D=1\u0026page%5Bsize%5D=15",
        "first":"/api/v1/issues?page%5Bnumber%5D=1\u0026page%5Bsize%5D=15",
        "prev":null,
        "next":null,
        "last":"/api/v1/issues?page%5Bnumber%5D=1\u0026page%5Bsize%5D=15"
      }
    }
    """
  And the response status should be "200"
