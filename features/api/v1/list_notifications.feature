Feature: API: List current user notifications

Scenario: GET /api/v1/notifications
  Given The app contain seed data
  And I set headers:
   | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
   | Content-Type | application/vnd.api+json |
  When I send a GET request to "/api/v1/notifications"
  Then the JSON response should be:
    """
    { 
      "data":[ 
        { 
          "id":"17",
          "type":"notifications",
          "attributes":{ 
            "subject":"Nofification 17",
            "body":"body 17",
            "created-at": "2020-02-11T22:01:54.824+01:00"
          }
        },
        { 
          "id":"16",
          "type":"notifications",
          "attributes":{ 
            "subject":"Nofification 16",
            "body":"body 16",
            "created-at": "2020-02-11T22:01:54.824+01:00"
          }
        },
        { 
          "id":"15",
          "type":"notifications",
          "attributes":{ 
            "subject":"Nofification 15",
            "body":"body 15",
            "created-at": "2020-02-11T22:01:54.824+01:00"
          }
        },
        { 
          "id":"14",
          "type":"notifications",
          "attributes":{ 
            "subject":"Nofification 14",
            "body":"body 14",
            "created-at": "2020-02-11T22:01:54.824+01:00"
          }
        },
        { 
          "id":"13",
          "type":"notifications",
          "attributes":{ 
            "subject":"Nofification 13",
            "body":"body 13",
            "created-at": "2020-02-11T22:01:54.824+01:00"
          }
        },
        { 
          "id":"12",
          "type":"notifications",
          "attributes":{ 
            "subject":"Nofification 12",
            "body":"body 12",
            "created-at": "2020-02-11T22:01:54.824+01:00"
          }
        },
        { 
          "id":"11",
          "type":"notifications",
          "attributes":{ 
            "subject":"Nofification 11",
            "body":"body 11",
            "created-at": "2020-02-11T22:01:54.824+01:00"
          }
        },
        { 
          "id":"10",
          "type":"notifications",
          "attributes":{ 
            "subject":"Nofification 10",
            "body":"body 10",
            "created-at": "2020-02-11T22:01:54.824+01:00"
          }
        },
        { 
          "id":"9",
          "type":"notifications",
          "attributes":{ 
            "subject":"Nofification 9",
            "body":"body 9",
            "created-at": "2020-02-11T22:01:54.824+01:00"
          }
        },
        { 
          "id":"8",
          "type":"notifications",
          "attributes":{ 
            "subject":"Nofification 8",
            "body":"body 8",
            "created-at": "2020-02-11T22:01:54.824+01:00"
          }
        }
      ],
      "meta": {
        "unread-count": 17
      },
			"links": { "next": "/api/v1/notifications?more_id=8" }
    }
    """
  And the response status should be "200"

  Scenario: GET /api/v1/notifications?more_id=8
  Given The app contain seed data
  And I set headers:
   | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
   | Content-Type | application/vnd.api+json |
  When I send a GET request to "/api/v1/notifications?more_id=8"
  Then the JSON response should be:
    """
    { 
      "data":[ 
        {
          "id":"7",
          "type":"notifications",
          "attributes":{ 
            "subject":"Nofification 7",
            "body":"body 7",
            "created-at": "2020-02-11T22:01:54.824+01:00"
          }
        },
        { 
          "id":"6",
          "type":"notifications",
          "attributes":{ 
            "subject":"Nofification 6",
            "body":"body 6",
            "created-at": "2020-02-11T22:01:54.824+01:00"
          }
        },
        { 
          "id":"5",
          "type":"notifications",
          "attributes":{ 
            "subject":"Nofification 5",
            "body":"body 5",
            "created-at": "2020-02-11T22:01:54.824+01:00"
          }
        },
        { 
          "id":"4",
          "type":"notifications",
          "attributes":{ 
            "subject":"Nofification 4",
            "body":"body 4",
            "created-at": "2020-02-11T22:01:54.824+01:00"
          }
        },
        { 
          "id":"3",
          "type":"notifications",
          "attributes":{ 
            "subject":"Nofification 3",
            "body":"body 3",
            "created-at": "2020-02-11T22:01:54.824+01:00"
          }
        },
        { 
          "id":"2",
          "type":"notifications",
          "attributes":{ 
            "subject":"Nofification 2",
            "body":"body 2",
            "created-at": "2020-02-11T22:01:54.824+01:00"
          }
        },
				{
				  "id": "1",
					"type": "notifications",
					"attributes": {
					  "subject": "Nofification 1",
						"body": "body 1",
            "created-at": "2020-02-11T22:01:54.824+01:00"
					}
				}
			],
      "meta": {
        "unread-count": 17
      },
			"links": { "next": null }
		}
		"""
