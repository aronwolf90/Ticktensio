class AddSubscriptionIdToOrganization < ActiveRecord::Migration[5.1]
  def change
    add_column :organizations, :subscription_id, :integer
  end
end
