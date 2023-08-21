class CreateServers < ActiveRecord::Migration[7.0]
  def change
    create_table :servers do |t|
      t.references :owner, foreign_key:{to_table: :users}, null: false
      t.string :title, null: false
      t.timestamps
    end
  end
end
