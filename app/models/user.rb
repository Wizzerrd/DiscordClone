class User < ApplicationRecord
  has_secure_password

  def valid_password
    
  end
end
