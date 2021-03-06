class CreateUserAvatars < ActiveRecord::Migration[5.2]
  def change
    create_table :user_avatars do |t|
      t.string :file

      t.timestamps
    end
  end
end
