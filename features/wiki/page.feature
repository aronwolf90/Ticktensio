Feature: Wiki page

@javascript
Scenario: Create and edit wiki page
  Given a test-organization exists
  And I am signed in (multitenant)
  # Create
  When I click on link "Wiki"
  And I click on link "New wikipage"
  And I enter "page title" into input named "Title"
  And select "category 1" from select box "Wiki category"
  And I click on submit
  And I reload the page
  Then the element "#side-body" contain the text "page title"
  # Edit
  When I click on link "Wiki"
  And I click on link "wiki page title"
  And I click on ".fa-edit"
  And I replace the text "wiki page test new" from the markdown editor "form .markdown-editor"
  And I click on submit
  Then the element "#side-body" contain the text "wiki page test new"
  When I reload the page
  Then the element "#side-body" contain the text "wiki page test new"
  # Change category
  When I click on link "Wiki"
  And I click on link "wiki page title"
  Then the element "#category .text" does not contain the text "subcategory 1"
  And I click on "#category .text"
  And I click on "#category .item:nth-child(2)"
  Then the element "#category .text" contain the text "subcategory 1"
  And I reload the page
  Then the element "#category .text" contain the text "subcategory 1"
  # Destroy wiki page
  When I click on link "Wiki"
  And I click on link "wiki page title"
  And I click on ".fa-trash"
  And I click on button "YES"
  Then the page contain the text "New wikicategory"
  Then the page does not contain the text "wiki page title"
