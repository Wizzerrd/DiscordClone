# == Schema Information
#
# Table name: channels
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  title      :string           not null
#  server_id  :bigint
#  owner_id   :bigint
#
class Channel < ApplicationRecord
    validates :title, presence: true
    
    belongs_to :server

    belongs_to :owner,
        foreign_key: :user,
        class_name: :User
        
    has_many :memberships, :as => :membershipable,
        dependent: :destroy

    has_many :users,
        through: :memberships,
        source: :user

end
