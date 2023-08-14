class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def show
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render json: { user: @user }
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @user = current_user
    if @user.update(update_params)
      render json: { user: @user }
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :dob)
  end

  def update_params
    params.require(:user).permit(:username, :bio)
  end
end
