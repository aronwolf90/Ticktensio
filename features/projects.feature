Feature: Projects

@javascript
Scenario: Create project
  Given I am signed in
  When I click on link "Projects"
  And I click on link "New project"
  And I enter "project title" into input named "data_name"
  And I click on submit
  Then the element "#side-body" contain the text "project title"

@javascript
Scenario: Update project
  Given a project exists
  When I am signed in
  When I click on link "Projects"
  And I click on ".fa-edit"
  And I enter "project title new" into input named "data_name"
  And I click on submit
  Then the element "#side-body" contain the text "project title new"