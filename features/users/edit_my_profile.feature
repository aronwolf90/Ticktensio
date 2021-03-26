Feature: Edit my profile

@javascript
Scenario: Change firstname
  Given a test-organization exists
  And I am signed in (multitenant)
  And I sleep "1" seconds
  When I click on ".navbar-nav img"
  And I click on link "Settings"
  And I enter "new user name" into input named "Firstname"
  And I click on submit
  And I reload the page
  Then the input "Firstname" has the value "new user name"
