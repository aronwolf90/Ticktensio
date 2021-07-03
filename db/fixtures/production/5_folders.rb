# frozen_string_literal: true

Folder.seed do |s|
  s.id         = 1
  s.name       = "Test project"
  s.project_id = 1
end

Folder.seed do |s|
  s.id         = 2
  s.name       = "Test folder"
end
