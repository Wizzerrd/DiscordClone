json.server do
    json.extract! @server, :id, :title, :created_at, :updated_at, :owner_id
    json.primary_channel @server.channels.first.id
end

json.channels do
    @server.channels.each do |channel|
        json.set! channel.id do 
            json.extract! channel, :id, :title
        end
    end
end