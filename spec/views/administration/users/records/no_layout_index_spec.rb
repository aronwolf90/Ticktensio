# frozen_string_literal: true

require "rails_helper"

RSpec.describe "administration/users/records/no_layout_index" do
  helper AdministrationHelper

  subject { rendered }

  let(:user) { build_stubbed(:admin) }
  let(:model) { Kaminari.paginate_array([record_day]).page(1) }
  let(:record_day) do
    build_stubbed(:record_day, day: Date.current).tap do |record_day|
      allow(record_day).to receive(:records)
        .and_return([record1, record2])
    end
  end
  let(:records) { Kaminari.paginate_array([record1, record2]).page(1) }
  let(:issue) { build_stubbed(:issue, title: "issues title")  }
  let(:record1) do
    build_stubbed(
      :record,
      start_time: 1.hours.ago,
      end_time: nil,
      issue: issue
     )
  end
  let(:record2) do
    build_stubbed(
      :record,
      start_time: 3.hours.ago,
      end_time: 2.hour.ago,
      issue: issue
    )
  end

  before do
    Timecop.freeze("01.01.2018")
    sign_in(Admin.new)
    assign(:model, model)
    assign(:parent, build_stubbed(:admin))
    assign(:this_month_spended_time, 3600 * 3.seconds)
    render
  end
  after { Timecop.return }

  it "record1 start_time is present" do
    expect(subject).to include(1.hour.ago.strftime("%I:%M %P"))
  end

  it "record2 start_time is present" do
    expect(subject).to include(3.hour.ago.strftime("%I:%M %P"))
  end

  it "record2 end_time is present" do
    expect(subject).to include(2.hour.ago.strftime("%I:%M %P"))
  end

  it "record2 end_time is present" do
    expect(subject).to include("issues title")
  end

  it "spended time on day is present" do
    expect(subject).to include("02:00:00")
  end

  it "spended time at this month" do
    expect(subject).to include("03:00:00")
  end
end
