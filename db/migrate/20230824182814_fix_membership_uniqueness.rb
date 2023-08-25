class FixMembershipUniqueness < ActiveRecord::Migration[7.0]
  def change
    remove_index :memberships, name: "index_memberships_on_membershipable_id"
  end
end
