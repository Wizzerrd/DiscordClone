class UpdateMessages < ActiveRecord::Migration[7.0]
  def change
    add_reference :messages, :channel, null: false
  end
end
