class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def show
    @user = User.find(params[:id])
    if @user
      render json: 'api/users/show'
    else
      render json: { errors: 'User Not Found' }, status: 404
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render json: 'api/users/show'
    else
      render json: { errors: @user.errors }, status: :unprocessable_entity
    end
  end

  def update
    @user = current_user
    if @user.update(update_params)
      render json: 'api/users/show'
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    user = current_user
    if current_user
      logout!
      user.destroy
      render json: { message: 'success' }
    else
      render json: {message: 'unauthorized'}, status: :unauthorized
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :dob)
  end

  def update_params
    params.require(:user).permit(:username, :bio)
  end
end
