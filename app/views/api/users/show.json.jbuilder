json.user do
    json.extract! @user, :id, :email, :username, :bio, :dob, :created_at, :updated_at
  end