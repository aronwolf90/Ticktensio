Feature: Project status

@javascript
Scenario: Create project status
  Given a test-organization exists
  And I am signed in (multitenant)
  # Create
  When I click on link "Projects"
  And I click on ".fa-plus"
  And I enter "Create name" into input named "Name"
  And I click on submit
  Then the element "#side-body" contain the text "Create name"
  And the element ".projects-left-aside" contain the text "Create name"
  # Edit
  When I reload the page
  And I click on link "Projects"
  And I click on link "Create name"
  And I click on ".fa-edit"
  And I enter "Edit name" into input named "Name"
  And I click on submit
  Then the page contain the text "Edit name"
  And the page does not contain the text "Create name"
  # Destroy
  When I reload the page
  When I click on link "Projects"
  And I click on link "Edit name"
  And I click on ".fa-trash"
  Then the page does not contain the text "Edit name"
  When I reload the page
  Then the page does not contain the text "Edit name"

@javascript
Scenario: move project status
  Given a test-organization exists
  And I am signed in (multitenant)
  When I click on link "Projects"
  Then the page contain the text "Test project 10"
  And the page contain the text "New"
  And I sleep "1" seconds
  When I drag "#project-status-1" to "#project-status-3"
  Then the element ".project-status:last-of-type" contain the text "New"
  When I reload the page
  Then the element ".project-status:last-of-type" contain the text "New"
