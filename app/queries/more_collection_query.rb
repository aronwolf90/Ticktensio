# frozen_string_literal: true

class MoreCollectionQuery < ApplicationQuery
  class Result
    attr_reader :collection, :has_more

    def initialize(collection:, has_more:)
      @collection = collection
      @has_more = has_more
    end
  end

  attr_reader(
    :collection,
    :more_id,
    :sort_key,
    :per_page
  )

  def initialize(collection, more_id:, sort_key: nil, per_page:, **)
    @collection = collection
    @more_id = more_id
    @sort_key = sort_key
    @per_page = per_page
  end

  def call
    if per_page.present?
      Result.new(
        collection: ordered_result_collection.limit(per_page),
        has_more: ordered_result_collection.count > per_page
      )
    else
      Result.new(
        collection: ordered_result_collection,
        has_more: false
      )
    end
  end

  private
    def result_collection
      if more_id.present?
        collection_by_more_id
      else
        collection
      end
    end

    def ordered_result_collection
      if sort_key.nil?
        result_collection.order(created_at: :desc, id: :desc)
      else
        result_collection.order(sort_key => :asc)
      end
    end

    def collection_by_more_id
      if sort_key.present?
        collection
          .where("#{sort_key} > ?", sort_attribute)
      else
        collection
          .where("""
                   id != :id AND
                   ((created_at < :created_at) OR (created_at = :created_at AND id < :id))
                   """,
                   created_at: more_id_entry.created_at, id: more_id_entry.id
                )
      end
    end

    def sort_attribute
      more_id_entry.public_send(sort_key)
    end

    def more_id_entry
      collection.find(more_id)
    end
end
