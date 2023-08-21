class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.references :author, foreign_key:{to_table: :users}, null: false
      t.references :server, null: false
      t.text :body, null: false
      t.timestamps
    end
  end
end
