json.friendship do
    json.extract! @friendship, :id, :sender_id, :receiver_id
end

accepted = false

@friendship.receiver.friendships.each do |receiver_friendship|
    if receiver_friendship.receiver_id == @friendship.sender_id
        accepted = true
        break
    end
end

json.accepted accepted