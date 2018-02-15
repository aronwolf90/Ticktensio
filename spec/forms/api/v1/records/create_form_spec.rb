require 'rails_helper'

describe Api::V1::Records::CreateForm do
  subject { described_class.call(params) }

  let(:params) do
    {
      data: {
        attributes: {
          start_time: Time.zone.now
        },
        relationships: {
          user: { data: { id: 1, type: 'users' }},
          issue: { data: { id: 1, type: 'issues' }}
        }
      }
    }
  end

  before do
    allow(User).to receive(:exists?).with(1).and_return(true)
    allow(Issue).to receive(:exists?).with(1).and_return(true)
  end

  context 'with valid params' do
    it 'form is valid' do
      expect(subject).to be_success
    end
  end

  context 'without start_time' do
    before { params[:data][:attributes].delete :start_time }

    it 'has an error' do
      expect(subject.errors).to eq(data: { attributes: { start_time: ["is missing"] }})
    end
  end

  context 'without user' do
    before { params[:data][:relationships].delete :user }

    it 'has an error' do
      expect(subject.errors).to eq(data: { relationships: { user: ["is missing"] }})
    end
  end

  context 'without issue' do
    before { params[:data][:relationships].delete :issue }

    it 'has an error' do
      expect(subject.errors).to eq(data: { relationships: { issue: ["is missing"] }})
    end
  end
end