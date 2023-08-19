# json.user do
#     json.extract! @user, :id, :email, :username, :bio, :dob, :created_at, :updated_at
#   end

json.server do
    json.extract! @server, :id, :title, :created_at, :updated_at, :owner_id
end