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