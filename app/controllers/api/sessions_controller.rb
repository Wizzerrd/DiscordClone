class Api::SessionsController < ApplicationController
  
  def show
    @user = current_user
    if @user
      render 'api/users/show'
    else
      render json: {user: nil}
    end
  end

  def create
    @user = User.find_by_credentials(params[:credential], params[:password])
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: ['Login or password is invalid.'] }, status: unauthorized
    end
  end

  def destroy
    if current_user
      logout!
      render json: { message: 'success' }
    else
      render json: {user: nil}
    end
  end

end
