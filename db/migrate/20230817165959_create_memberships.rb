class CreateMemberships < ActiveRecord::Migration[7.0]
  def change
    create_table :memberships do |t|
      t.references :user, foreign_key: true, null: false
      t.references :membership, polymorphic: true
      t.timestamps
    end
  end
end
