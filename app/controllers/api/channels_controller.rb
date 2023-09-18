class Api::ChannelsController < ApplicationController
    def show
        @channel = Channel.find(params[:id])
        if @channel
            render 'api/channels/show'
        else
            render json: {errors: 'Channel Not Found'}, status: 404
        end
    end

    def create
        @channel = Channel.new(channel_params)
        if @channel.save!
            ServersChannel.broadcast_to(@channel.server, @channel)
            render 'api/channels/show'
        else
            render json: {errors: @channel.errors}, status: :unprocessable_entity
        end
    end

    private 

    def channel_params
        params.require(:channel).permit(:title, :owner_id, :server_id)
    end

end
