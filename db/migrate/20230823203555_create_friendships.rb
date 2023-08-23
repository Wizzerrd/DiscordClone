class CreateFriendships < ActiveRecord::Migration[7.0]
  def change
    create_table :friendships do |t|
      t.references :sender, foreign_key:{to_table: :users}, null: false
      t.references :receiver, foreign_key:{to_table: :users}, null: false, unique: {scope: :sender}
      t.timestamps
    end
  end
end
