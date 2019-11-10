Feature: API: create a stripe checkout session

Scenario: Valid post '/api/v1/stripe_checkout_session'
  Given I am an user with an id of 1
  And I set headers:
   | Authorization | Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.ClWbiKD35AyiLHuBiDeCTeDwseNvX4WxFlZqdar37TU |
   | Content-Type | application/vnd.api+json |
  When I send a POST request to "/api/v1/stripe_checkout_sessions" with the following:
    """
    {}
    """
  Then the JSON response should be:
    """
    {
      "data": {
        "id": "cs_test_8fh4AlX39Ncd3y8Rz2ysYSFOhPm8a4xkP4F2TnVOGnAMb61zyuCxXr50",
        "type": "stripe-checkout-sessions"
      }
    }
    """
  And the response status should be "201"
