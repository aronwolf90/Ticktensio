# frozen_string_literal: true

# prevent webpack error on first api call
module Api
  module V1
  end
end

# prevent to ignore explicity nil values in the hash
# normally we dont use shortcuts for names, but we plann to create a pull
# request with this code, and the autor use this shortcuts
class HashMapper::Map
  def hash_mapper_no_value?(key, value, h)
    if h.respond_to?(:key)
      value.nil? && !h.key?(key)
    else
      value.nil?
    end
  end

  def get_value_from_input(_output, input, path, _meth)
    value = path.inject(input) do |h, e|
      v = if h.is_a?(Hash)
        [h[e.to_sym], h[e.to_s]].compact.first
      else
        h&.dig(e)
      end
      return :hash_mapper_no_value if hash_mapper_no_value?(e, v, h)

      v
    end
    delegated_mapper ? delegate_to_nested_mapper(value, e) : value
  end

  def add_value_to_hash!(hash, path, value)
    path.inject_with_index(hash) do |h,e,i|
      if !h[e].nil? # it can be FALSE
        h[e]
      else
        h[e] = if i == path.size-1
          local_value = path.apply_filter(value)
          next if local_value == :hash_mapper_no_value 
          local_value
        else
          if path.segments[i+1].is_a? Integer
            []
          else
            {}
          end
        end
      end
    end
  end
end
