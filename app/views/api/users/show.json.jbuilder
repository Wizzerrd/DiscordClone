json.user do
    json.extract! @user, :id, :email, :username, :bio, :dob, :created_at, :updated_at
end

json.servers do 

  @user.servers.each do |server|

    json.set! server.id do
      json.extract! server, :id, :title
      json.primary_channel server.channels.first.id
    end

  end
  
end

json.friends do

  @user.friendships.each do |friendship|
    accepted = false
    friendship.receiver.friendships.each do |receiver_friendship|
        if receiver_friendship.receiver_id == friendship.sender_id
            accepted = true
            break
        end
    end

    json.set! friendship.receiver_id do
      json.user_id friendship.receiver_id
      json.username friendship.receiver.username
      json.accepted accepted
    end
  end
  
end