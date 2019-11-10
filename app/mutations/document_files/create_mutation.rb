# frozen_string_literal: true

module DocumentFiles
  class CreateMutation < ApplicationMutation
    def call
      ActiveRecord::Base.transaction do
        uploader = ChunckUploader.new(model)
        model.file = attributes[:file].original_filename
        model.save!
        uploader.start_mulipart_upload("Content-Type" => attributes[:file].content_type)
        uploader.upload_part(attributes[:file].read)
        model.save!
        uploader.complete_multipart_upload unless attributes[:not_finished]
        model
      end
    end
  end
end
