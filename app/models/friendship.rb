# == Schema Information
#
# Table name: friendships
#
#  id          :bigint           not null, primary key
#  sender_id   :bigint           not null
#  receiver_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Friendship < ApplicationRecord
    validates :sender_id, :receiver_id, presence: true
    validates :receiver_id, uniqueness: {scope: :sender_id}
    
    belongs_to :sender,
        foreign_key: :sender_id,
        class_name: :User

    belongs_to :receiver,
        foreign_key: :receiver_id,
        class_name: :User
        
        
end
