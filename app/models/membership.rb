# == Schema Information
#
# Table name: memberships
#
#  id              :bigint           not null, primary key
#  user_id         :bigint           not null
#  membership_type :string           not null
#  membership_id   :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Membership < ApplicationRecord
    validates :user_id, :membership_type, :membership_id, presence: true

    belongs_to :user
    belongs_to :membershipable, :polymorphic => true
end
