Feature: Board lists

@javascript
Scenario: create board list
  Given a test-organization exists with project specific board lists
  And I am signed in (multitenant)
  And I click on link "Tickets"
  And I click on ".fa-plus"
  And I enter "board list name" into input named "Name"
  And I click on submit
  Then the page contain the text "board list name"
  When I reload the page
  Then the page contain the text "board list name"

@javascript
Scenario: edit board list
  Given a test-organization exists with project specific board lists
  And I am signed in (multitenant)
  When I click on link "Tickets"
  And I click on ".column:first-of-type .fa-edit"
  And I enter "new board list name" into input named "Name"
  And I click on submit
  And I reload the page
  Then the page contain the text "new board list name"

@javascript
Scenario: change board lists order
  Given a test-organization exists with project specific board lists
  And I am signed in (multitenant)
  When I click on link "Tickets"
  Then the page contain the text "Test project"
  When I drag "#column-4 > .card-header" to "#column-6 > .card-header"
  Then the element ".column:last-of-type" contain the text "Backlog"
  When I reload the page
  Then the element ".column:last-of-type" contain the text "Backlog"

@javascript
Scenario: change issues order
  Given a test-organization exists with project specific board lists
  And I am signed in (multitenant)
  When I click on link "Tickets"
  Then the page contain the text "Test project"
  When I drag "#list-issue-4" to "#list-issue-1 .badge:last-of-type"
  Then the element "#column-4 .list-issue:last-of-type" contain the text "Test issue 4"
  When I reload the page
  Then the element "#column-4 .list-issue:last-of-type" contain the text "Test issue 4"

@javascript
Scenario: move issue to other board
  Given a test-organization exists with project specific board lists
  And I am signed in (multitenant)
  When I click on link "Tickets"
  Then the element "#side-body" contain the text "Backlog"
  And the page contain the text "Test project"
  When I drag "#list-issue-5" to "#list-issue-1 .labels .badge"
  Then the element "#column-4 .list-issue:last-of-type" contain the text "Test issue 5"
  When I reload the page
  Then the element "#column-4 .list-issue:last-of-type" contain the text "Test issue 5"
