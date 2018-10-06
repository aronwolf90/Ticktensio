# frozen_string_literal: true

Given(/^The app contain seed data$/) do
  suppress_output do
    load Rails.root.join("db", "seeds.rb")
  end
end

def find_or_create_current_user
  Admin.find_or_create_by!(email: "admin@lvh.me") do |user|
    user.password = "testtest"
    user.password_confirmation = "testtest"
  end
end

Given(/^I am registered$/) do
  Admin.create!(email: "admin@lvh.me", password: "testtest", password_confirmation: "testtest")
end

Given(/^I am not registered$/) do; end

Given(/^I am signed in$/) do
  find_or_create_current_user
  visit "/users/sign_in"
  fill_in "user_email", with: "admin@lvh.me"
  fill_in "user_password", with: "testtest"
  find('input[name="commit"]').click
end

When(/^I navigate to "([^\"]*)"$/) do |link|
  visit link
end

When(/^I enter "([^\"]*)" into input named "([^\"]*)"$/) do |text, name|
  fill_in name, with: text
  sleep 0.1
  find("body").click
end

When(/^an acive issue exists$/) do
  sleep 0.1
  find(".fa-play", match: :prefer_exact).click
end

When(/^I replace the text "([^\"]*)" from the markdown editor "([^\"]*)"$/) do |text, element|
  js_comand = "$('#{element}')[0].editor.setValue('#{text}')"
  page.driver.browser.execute_script(js_comand)
end

When(/^I enter "([^\"]*)" into "([^\"]*)"$/) do |text, element|
  find(element).set(text)
end

When(/^I click on submit$/) do
  sleep 0.1
  find('input[name="commit"], button[type="submit"]').click
end

When(/^I click on "([^\"]*)"$/) do |element|
  sleep 0.2
  find(element, match: :prefer_exact).click
end

When(/^I click on link "([^\"]*)"$/) do |text|
  sleep 0.2
  find("a", text: text, match: :prefer_exact).click
end

When(/^select "([^\"]*)" from select box "([^\"]*)"$/) do |text, name|
  select text, from: name
end

When(/^I reload the page$/) do
  sleep 0.1 # wait for for unfinished requests
  page.driver.browser.navigate.refresh
end

Then(/^the page contain the text "([^\"]*)"$/) do |text|
  sleep 0.1
  expect(page).to have_content text
end

Then (/^I enter enter a file into input named "([^\"]*)"$/) do |element|
  page.attach_file(element, "/etc/hostname")
end

Then(/^the page does not contain the text "([^\"]*)"$/) do |text|
  sleep(0.1)
  expect(page).not_to have_content text
end

Then(/^the element "([^\"]*)" contain the text "([^\"]*)"$/) do |element, text|
  within element do
    sleep 0.1
    expect(page).to have_content text
  end
end

Then(/^the element "([^\"]*)" does not contain the text "([^\"]*)"$/) do |element, text|
  within element do
    sleep 0.1
    expect(page).not_to have_content text
  end
end

Then(/^the page contain the element "([^\"]*)"$/) do |text|
  sleep(0.1)
  expect(page).to have_css text
end

Then(/^I am on page "([^\"]*)"$/) do |link|
  sleep(0.1)
  expect(page).to have_current_path(link)
end

Then(/^the input "([^\"]*)" has the value "([^\"]*)"$/) do |input_name, value|
  sleep(0.1)
  expect(find_field(input_name).value).to eq value
end
