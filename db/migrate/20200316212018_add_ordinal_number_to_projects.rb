class AddOrdinalNumberToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :ordinal_number, :integer, default: 0
  end
end
