Feature: API: update a event

@javascript
Scenario: Put an valid event using json in POST body
  Given a test-organization exists and is loaded
  And I set headers:
   | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
   | Content-Type | application/vnd.api+json |
  When I send a PUT request to "/api/v1/events/1" with the following:
    """
    {
    "data": {
        "id": 1,
        "type": "events",
        "attributes": {
          "title": "New title",
          "all-day": "comment", 
          "start-time": "1.1.2019"
        }
      }
    }
    """
  And the response status should be "204"

  @javascript
  Scenario: Put an invalid event using json in POST body
    Given a test-organization exists and is loaded
    And I set headers:
     | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
     | Content-Type | application/vnd.api+json |
    When I send a PUT request to "/api/v1/events/1" with the following:
    """
    {
      "data": {
        "id": 1,
        "type": "events",
        "attributes": { 
          "title": null 
        }
      }
    }
    """
    Then the response status should be "400"
