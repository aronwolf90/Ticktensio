class CreateNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :notifications do |t|
      t.string :subject
      t.text :body
      t.string :path
      t.boolean :readed, default: false, null: false
      t.references :user, null: false

      t.timestamps
    end
  end
end
