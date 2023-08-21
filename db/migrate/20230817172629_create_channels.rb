class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels do |t|
      t.timestamps

      t.string :title, null: false
      t.references :server
      t.references :owner
    end
  end
end
