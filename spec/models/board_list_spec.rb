require 'rails_helper'

RSpec.describe BoardList, type: :model do
  it { is_expected.to belong_to(:project) }
end
