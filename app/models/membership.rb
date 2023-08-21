# == Schema Information
#
# Table name: memberships
#
#  id                  :bigint           not null, primary key
#  user_id             :bigint           not null
#  membershipable_type :string           not null
#  membershipable_id   :bigint           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#
class Membership < ApplicationRecord
    validates :user_id, :membershipable_type, :membershipable_id, presence: true

    belongs_to :membershipable, :polymorphic => true
end
