class Api::FriendshipsController < ApplicationController
  wrap_parameters include: Friendship.attribute_names

    def show
        @friendship = Friendship.find(params[:id])
        if @friendship
            render 'api/friendships/show'
        else
            render json: {errors: 'Not Found'}, status: 404
        end
    end

    def create
        @friendship = Friendship.new(friendship_params)
        if @friendship.save!
            render 'api/friendships/show'
        else
            render json: {errors: "Unprocessable Entity"}, status: 422
        end
    end

    def destroy
    end

    private

    def friendship_params
        params.require(:friendship).permit(:sender_id, :receiver_id)
    end
end
