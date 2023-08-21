json.channel do
    json.extract! @channel, :id, :title, :created_at, :updated_at, :owner_id, :server_id
end

json.messages do
    @channel.messages.each do |message|
        json.set! message.id do
            json.extract! message, :id, :author_id, :body
        end
    end
end
