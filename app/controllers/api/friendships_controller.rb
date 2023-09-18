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
        if(params[:mutual])
            friendship1 = Friendship.where(sender_id: params[:sender_id]).find_by(receiver_id: params[:receiver_id])
            friendship2 = Friendship.where(sender_id: params[:receiver_id]).find_by(receiver_id: params[:sender_id])
            if friendship1 && friendship2
                friendship1.destroy
                friendship2.destroy
                @friendship = friendship1
                render 'api/friendships/show' 
            else
                render json: {errors: 'Not Found'}, status: 404
            end
        else
            @friendship = Friendship.where(sender_id: params[:sender_id]).find_by(receiver_id: params[:receiver_id])
            if @friendship
                @friendship.destroy
                render 'api/friendships/show'
            else
                render json: {errors: 'Not Found'}, status: 404
            end
        end
    end

    private

    def friendship_params
        params.require(:friendship).permit(:sender_id, :receiver_id)
    end
end
