# frozen_string_literal: true

Folder.seed do |s|
  s.id   = 1
  s.name = "folder 1"
end

# id 1
DocumentFiles::CreateMutation.call(
  model: DocumentFile.new,
  file: Rack::Test::UploadedFile.new(
    Rails.root.join("spec", "fixtures", "document.txt")
  )
)

Document.seed do |s|
  s.id               = 1
  s.folder_id        = 1
  s.name             = "Document 1"
  s.document_file_id = 1
end