# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  author_id  :bigint           not null
#  server_id  :bigint           not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord
    validates :body, :author_id, :server_id, presence: true

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    belongs_to :server
end
