# frozen_string_literal: true

# id 1
DocumentFiles::CreateMutation.call(
  model: DocumentFile.new,
  file: Rack::Test::UploadedFile.new(
    Rails.root.join("db", "fixtures", "production", "document.pdf"),
    'application/pdf'
  )
)

Document.seed do |s|
  s.id               = 1
  s.name             = "Test document"
  s.folder_id        = 2
  s.document_file_id = 1
end

