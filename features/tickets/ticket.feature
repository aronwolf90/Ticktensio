Feature: Issue

@javascript
Scenario: Create Issue with minimal attributes
  Given a test-organization exists
  And I am signed in (multitenant)
  When I click on link "Tickets"
  And I click on ".issues-board-body .fa-plus"
  And I enter "issue name" into input named "Title"
  And I click on submit
  And I reload the page
  Then the page contain the text "issue name"
  # Create Issue with all attributes filled
  When I click on link "Tickets"
  And I click on ".issues-board-body .fa-plus"
  And I enter "New ticket" into input named "Title"
  And I click on "#input-labels"
  And I click on "li" with "Bug"
  And I click on "#input-user"
  And I click on "li" with "Aron Wolf"
  And I replace the text "Test description" from the markdown editor "#input-description"
  And I click on submit
  And I click on link "New ticket"
  Then the page contain the text "New ticket"
  And the element ".vs__selected-options" contain the text "Bug"
  And the page contain the text "Test description"
  When I reload the page
  Then the page contain the text "New ticket"
  And the element ".vs__selected-options" contain the text "Bug"
  And the page contain the text "Test description"
  # Show issue
  When I click on link "Tickets"
  And I click on link "Test issue 1"
  Then the element "#side-body" contain the text "Test issue 1"
  And the element "#side-body" contain the text "description"
  And the element "#side-body" contain the text "Created at"
  # Edit issue with all fields changed
  When I click on link "Tickets"
  And I click on link "Test issue 1"
  And I click on ".fa-edit"
  And I enter "new issue name" into input named "name-input"
  And I replace the text "new description" from the markdown editor "form .markdown-editor"
  And I click on ".show-body [type='submit']"
  Then the element "#side-body" contain the text "new issue name"
  And the element "#side-body" contain the text "new description"
  # Edit issue with all not necessary fields removed
  When I click on link "Tickets"
  And I click on link "Test issue 2"
  And I click on ".fa-edit"
  And I replace the text "" from the markdown editor "form .markdown-editor"
  And I click on ".show-body [type='submit']"
  Then the element "#side-body" does not contain the text "description for the test issue"
  # Delete issue
  When I click on link "Tickets"
  Then the page contain the element "#list-issue-2"
  When I click on link "Test issue 2"
  And I click on ".fa-trash"
  And I click on button "YES"
  Then the page does not contain the element "#list-issue-2"
  # Change user
  When I click on link "Tickets"
  And I click on link "Test issue 3"
  And I click on "#assigen .text"
  Then the element "#assigen .text" does not contain the text "user2"
  When I click on "#assigen input"
  And I sleep "1" seconds
  And I click on "#assigen .item:nth-child(2)"
  Then the element "#assigen .text" contain the text "user2"
  When I reload the page
  Then the element "#assigen .text" contain the text "user2"
  When I click on link "Tickets"
  Then the page contain the element "[alt='user2 simson']"
  # Change complexity
  When I click on link "Tickets"
  And I click on link "Test issue 3"
  And I click on "#complexity .text"
  And I sleep "1" seconds
  And I click on "#complexity .item:nth-child(2)"
  And I reload the page
  Then the element "#complexity .text" contain the text "0.5"
  # Comment
  When I click on link "Tickets"
  And I click on link "Test issue 3"
  And I replace the text "test comment" from the markdown editor ".comments .markdown-editor"
  And I click on ".comments .btn"
  Then the element ".comment" contain the text "test comment"
  When I reload the page
  Then the element ".comment" contain the text "test comment"
  # Change project
  When I click on link "Tickets"
  And I click on link "Test issue 3"
  And I click on "#right-aside-project .text"
  And I sleep "1" seconds
  And I click on "#right-aside-project .item:nth-child(2)"
  Then the element "#right-aside-project .text" contain the text "Test project 2"
  And I reload the page
  Then the element "#right-aside-project .text" contain the text "Test project 2"

@javascript
Scenario: Create Issue on global board
  Given a test-organization exists with global board lists
  And I am signed in (multitenant)
  When I click on link "Tickets"
  And I click on ".issues-board-body .fa-plus"
  And I enter "issue name" into input named "Title"
  And I click on submit
  And I reload the page
  Then the page contain the text "issue name"
  # Create Issue on global board when all is selected
  When I click on link "Tickets"
  And I sleep "1" seconds
  And I click on "#project-select" 
  And I click on "[role='option']" with "All"
  And I click on ".issues-board-body .fa-plus"
  And I enter "All selected issue name" into input named "Title"
  And I click on "#project-select" 
  And I click on "[role='option']" with "Test project 2"
  And I click on submit
  Then the page contain the text "All selected issue name"
  When I reload the page
  Then the page contain the text "All selected issue name"
