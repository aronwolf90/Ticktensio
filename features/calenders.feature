Feature: Projects

@javascript
Scenario: Create calender
  Given I am signed in
  When I click on link "Calenders"
  Then the element "#side-body" contain the text "Today"
