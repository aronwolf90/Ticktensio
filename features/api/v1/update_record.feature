Feature: API: create an record

@javascript
Scenario: Put an valid record using json in PUT body
  Given a test-organization exists and is loaded
  And I set headers:
   | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
   | Content-Type | application/vnd.api+json |
  And I send a PUT request to "/api/v1/records/1" with the following:
    """
    {
      "data": {
        "id": 1,
        "type": "records",
        "attributes": { "end-time": "2018-02-04T13:00:00.000Z" }
      }
    }
    """
  Then the response status should be "204"

@javascript
Scenario: Put an invalid record using json in PUT body
  Given a test-organization exists and is loaded
  And I set headers:
   | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
   | Content-Type | application/vnd.api+json |
  When I send a PUT request to "/api/v1/records/1" with the following:
    """
    {
      "data": {
        "attributes": { "start-time": null }
      }
    }
    """
  Then the response status should be "400"
