json.membership do
    json.extract! @membership, :id, :created_at, :user_id, :membershipable_id, :membership_type, :accepted
end