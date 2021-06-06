Feature: Board lists

@javascript
Scenario: create board list
  Given a test-organization exists
  And I am signed in (multitenant)
  When I click on navbar link "Projects"
  And I click on link "Test project"
  And I click on link "Tickets"
  And I click on link "add list"
  And I enter "board list name" into input named "Name"
  And I click on submit
  Then the page contain the text "board list name"
  When I reload the page
  Then the page contain the text "board list name"
  And the page contain the text "Test project"

@javascript
Scenario: edit board list
  Given a test-organization exists
  And I am signed in (multitenant)
  When I click on navbar link "Projects"
  And I click on link "Test project"
  And I click on link "Tickets"
  And I click on ".column:first-of-type .fa-edit"
  And I enter "new board list name" into input named "Name"
  And I click on submit
  Then the page contain the text "new board list name"
  When I reload the page
  Then the page contain the text "new board list name"
  And the page contain the text "Test project"

@javascript
Scenario: change board lists order
  Given a test-organization exists
  And I am signed in (multitenant)
  When I click on navbar link "Projects"
  And I click on link "Test project"
  And I click on link "Tickets"
  And I drag "#column-4 > .card-header" to "#column-6 > .card-header"
  Then the element ".column:last-of-type" contain the text "Backlog"
  When I reload the page
  Then the element ".column:last-of-type" contain the text "Backlog"
  And the page contain the text "Test project"

@javascript
Scenario: change issues order
  Given a test-organization exists
  And I am signed in (multitenant)
  When I click on navbar link "Projects"
  And I click on link "Test project"
  And I click on link "Tickets"
  And I drag "#list-issue-4" to "#list-issue-1 .badge:last-of-type"
  Then the element "#column-4 .list-issue:last-of-type" contain the text "Test issue 4"
  When I sleep "1" seconds
  And I reload the page
  Then the element "#column-4 .list-issue:last-of-type" contain the text "Test issue 4"
  And the page contain the text "Test project"

@javascript
Scenario: move issue to other board
  Given a test-organization exists
  And I am signed in (multitenant)
  When I click on navbar link "Projects"
  And I click on link "Test project"
  And I click on link "Tickets"
  Then the element "#side-body" contain the text "Backlog"
  When I drag "#list-issue-5" to "#list-issue-1 .labels .badge"
  Then the element "#column-4 .list-issue:last-of-type" contain the text "Test issue 5"
  When I reload the page
  Then the element "#column-4 .list-issue:last-of-type" contain the text "Test issue 5"
  And the page contain the text "Test project"

@javascript
Scenario: Show ticket
  Given a test-organization exists
  And I am signed in (multitenant)
  When I click on navbar link "Projects"
  And I click on link "Test project"
  And I click on link "Tickets"
  And I click on body link "Test issue 1"
  Then the page contain the text "description for the test issue"
  And the page contain the text "Test project"

@javascript
Scenario: Create Issue
  Given a test-organization exists
  And I am signed in (multitenant)
  When I click on navbar link "Projects"
  And I click on link "Test project"
  And I click on link "Tickets"
  And I click on ".issues-board-body .fa-plus"
  And I enter "issue name" into input named "Title"
  And I click on submit
  And I reload the page
  Then the page contain the text "Test project"
