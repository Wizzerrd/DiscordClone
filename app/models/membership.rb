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
#  accepted            :boolean          not null
#
class Membership < ApplicationRecord
    validates :user_id, :membershipable_type, :membershipable_id, presence: true
    validates :accepted, inclusion: [true, false]

    validates :membershipable_id, uniqueness: {scope: [:user_id, :membershipable_type]}

    belongs_to :membershipable, :polymorphic => true

    belongs_to :user
end
