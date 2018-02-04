class CreateRecords < ActiveRecord::Migration[5.1]
  def change
    create_table :records do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.references :user, foreign_key: true
      t.references :issue, foreign_key: true

      t.timestamps
    end
  end
end
