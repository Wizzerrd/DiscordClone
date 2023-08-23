json.message do
    json.extract! @message, :id, :created_at, :updated_at, :author_id, :body
end