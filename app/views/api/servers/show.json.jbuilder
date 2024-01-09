json.server do
    json.extract! @server, :id, :title, :created_at, :updated_at, :owner_id
end

json.channels do
    @server.channels.each do |channel|
        json.set! channel.id do 
            json.extract! channel, :id, :title
        end
    end
end

json.members do
    @server.users.each do |member|
        json.set! member.id do
            json.extract! member, :id, :username
            json.avatarUrl member.avatar.attached? ? url_for(member.avatar) : nil
        end
    end
end