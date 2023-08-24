json.user do
    json.extract! @user, :id, :email, :username, :bio, :dob, :created_at, :updated_at
end

json.servers do 

  @user.servers.each do |server|

    json.set! server.id do
      json.extract! server, :id, :title, :owner_id
      json.primary_channel server.channels.first.id
      
      arr = []
      server.users.each do |member|
        arr.push member.id
      end

      json.members arr
      
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

json.incoming_friendships do
  @user.incoming_friendships.each do |incoming_friendship|
    accepted = false
    @user.friendships.each do |friendship|
      if friendship.receiver_id == incoming_friendship.sender_id
        accepted = true
        break
      end
    end

    if accepted 
      json.set! incoming_friendship.sender_id do
        json.user_id incoming_friendship.sender_id
        json.username incoming_friendship.sender.username
      end
    end
    
  end
  
end