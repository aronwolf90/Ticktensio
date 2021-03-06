# frozen_string_literal: true

require_relative "json_api_deserializer/has_many_mapper"
require_relative "json_api_deserializer/has_many_sort_mapper"
require_relative "json_api_deserializer/attribute_mapper"
require_relative "json_api_deserializer/belongs_to_mapper"

class JsonApiDeserializer
  extend HashMapper

  class << self
    def call(*args)
      normalize(*args)
    end

    def has_many(name, sort_attribute: nil)
      HasManyMapper.call(self, name: name)
    end

    def has_many_sort(name, attribute: nil)
      HasManySortMapper.call(self, name: name, attribute: attribute)
    end

    def attribute(name)
      AttributeMapper.call(self, name: name)
    end

    def belongs_to(name)
      BelongsToMapper.call(self, name: name)
    end
  end
end
