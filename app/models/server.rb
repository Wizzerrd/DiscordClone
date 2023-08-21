# == Schema Information
#
# Table name: servers
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  owner_id   :bigint           not null
#
class Server < ApplicationRecord
    validates :owner_id, :title, presence: true

    has_many :memberships, :as => :membershipable,
        dependent: :destroy

    has_many :users,
        through: :memberships,
        source: :user

    has_many :channels
end
