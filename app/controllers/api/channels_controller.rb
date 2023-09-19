class Api::ChannelsController < ApplicationController
    wrap_parameters include: Channel.attribute_names
    
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

    def update
        @channel = Channel.find(params[:id])
        if @channel
            @channel.update(channel_params)
            ServersChannel.broadcast_to(@channel.server, @channel)
            render 'api/channels/show'
        else
            render json: {errors: 'Channel Not Found'}, status: 404
        end
    end

    def destroy
        @channel = Channel.find(params[:id])
        if @channel
            # ServersChannel.broadcast_to(@channel.server, {[@channel.id]: nil})
            @channel.destroy
            render json: {message: 'Channel succesfully deleted'}
        else
            render json: {errors: 'Channel Not Found'}, status: 404
        end
    end

    private 

    def channel_params
        params.require(:channel).permit(:title, :owner_id, :server_id)
    end

end
