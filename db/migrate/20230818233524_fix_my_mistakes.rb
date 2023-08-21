class FixMyMistakes < ActiveRecord::Migration[7.0]
  def change
    add_reference :servers, :owner, foreign_key:{to_table: :users}, null: false
    add_reference :channels, :owner, foreign_key:{to_table: :users}
  end
end
