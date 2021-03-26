Feature: Project board lists

@javascript
Scenario: move project status
  Given a test-organization exists
  And I am signed in (multitenant)
  When I click on link "Projects"
  And I click on aside link "New"
  And I drag "#column-1 .card-header .text" to "#column-3 .card-header .fa-edit"
  Then the element ".column:last-of-type" contain the text "New"
  When I reload the page
  Then the element ".column:last-of-type" contain the text "New"

@javascript
Scenario: move project to other board
  Given a test-organization exists
  And I am signed in (multitenant)
  When I click on link "Projects"
  And I click on aside link "New"
  And I sleep "1" seconds
  When I drag "#list-project-1" to "#list-project-2"
  Then the element "#column-2 .list-project:first-of-type" contain the text "Test project 2"
  When I reload the page
  Then the element "#column-2 .list-project:first-of-type" contain the text "Test project 2"
