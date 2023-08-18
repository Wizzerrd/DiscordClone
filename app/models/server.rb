# == Schema Information
#
# Table name: servers
#
#  id         :bigint           not null, primary key
#  owner_id   :bigint           not null
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Server < ApplicationRecord
    validates :owner_id, :title, presence: true
    
    belongs_to :owner,
        foreign_key: :user,
        class_name: :User

    has_many :memberships, :as => :membershipable,
        dependent: :destroy

    has_many :users,
        through: :memberships,
        source: :user

    has_many :channels
end
