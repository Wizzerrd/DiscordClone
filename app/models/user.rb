# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  bio             :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  dob             :date             not null
#
class User < ApplicationRecord
  before_validation :ensure_session_token
  
  has_secure_password
  
  validate :valid_username
  validate :old_enough
  validate :valid_password

  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :email, :username, :session_token, uniqueness: true
  validates :session_token, :dob, presence: true

  has_many :memberships

  has_many :servers,
    through: :memberships

  has_many :owned_servers,
    foreign_key: :user,
    class_name: :Server,
    dependent: :destroy

  has_many :owned_channels,
    foreign_key: :user,
    class_name: :Channel,
    dependent: :destroy

  def self.find_by_credentials(cred, pass)
    if cred && cred.include?('@')
      user = User.find_by(email: cred)
    else
      user = User.find_by(username: cred)
    end

    if user && user.authenticate(pass)
      return user
    else
      return nil
    end
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save
    return self.session_token
  end
  
  private

  def generate_session_token
    token = SecureRandom.base64
    while User.find_by(session_token: token)
      token = SecureRandom.base64
    end
    token
  end

  # Custom validations
  
  def valid_username
    if username.present?
      errors.add(:username, 'Must be between 2 and 32 in length') unless username.length.between?(2, 32)
      errors.add(:username, 'Username cannot contain repeating dots') if username.include?('..')
      errors.add(:username, 'Please only use numbers, letters, underscores _ , or periods .') unless username.match?(/^[a-zA-Z0-9._]+$/)
    else
      errors.add(:username, 'Must be between 2 and 32 in length')
    end
  end

  def valid_password
    return if password.nil?
    errors.add(:password, 'Must be at least 8 characters long') unless password.length >= 8
    errors.add(:password, 'Must be 72 or fewer in length') unless password.length <= 72
  end

  def old_enough
    return if dob.nil?
    errors.add(:dob, 'You must be at least 13 years old to use Discord.') if dob > 13.years.ago.to_date
  end

end
