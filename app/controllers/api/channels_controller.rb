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
        if @channel && Channel.where(server_id: @channel.server_id).length > 1
            @channel.destroy
            obj = {}
            obj[params[:id]] = nil
            ServersChannel.broadcast_to(@channel.server, obj)
            render json: {message: 'Channel succesfully deleted'}
        elsif @channel
            render json: {errors: 'Cannot delete last channel'}, status: :unprocessable_entity
        else
            render json: {errors: 'Channel Not Found'}, status: 404
        end
    end

    private 

    def channel_params
        params.require(:channel).permit(:title, :owner_id, :server_id)
    end

end
