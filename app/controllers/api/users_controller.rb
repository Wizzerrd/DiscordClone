class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def show
    @user = User.find(params[:id])
    if @user
      render 'api/users/show'
    else
      render json: { errors: 'User Not Found' }, status: 404
    end
  end

  def index
    if params[:username]
      @user = User.find_by(username: params[:username])
      if @user
        render 'api/users/show'
      else
        render json: { errors: 'User Not Found' }, status: 404
      end
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: @user.errors }, status: :unprocessable_entity
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
