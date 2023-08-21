class Api::MembershipsController < ApplicationController
    wrap_parameters include: Message.attribute_names
    
    def show
        @message = Message.find(params[:id])
        if @message
            render 'api/messages/show'
        else
            render json: {error: 'Message not found'}, status: 404
        end
    end
    
    def create
        @message = Message.new(message_params)
        if @message.save
            render 'api/messages/show'
        else
            render json: {errors: @message.errors}, status: unprocessable_entity
        end
    end

    private

    def message_params
        params.require(:message).permit(:author_id, :server_id, :body)
    end
end