class Api::ServersController < ApplicationController
    wrap_parameters include: Server.attribute_names

    def show
        @server = Server.find(params[:id])
        if @server
            render 'api/servers/show'
        else
            render json: {errors: 'Server Not Found'}, status: 404
        end
    end

    def create
        @server = Server.new(server_params)
        if @server.save
            Membership.create({membershipable_id: @server.id, membershipable_type:'Server', user_id: @server.owner_id, accepted: true})
            channel = Channel.create({title:'general', server_id: @server.id, owner_id: @server.owner_id})
            Membership.create({membershipable_id: channel.id, membershipable_type:'Channel', user_id: @server.owner_id, accepted: true})
            render 'api/servers/show'
        else
            render json: {errors: @server.errors}, status: :unprocessable_entity
        end
    end

    def update
        @server = Server.find(params[:id])
        if @server
            @server.update(server_params)
            render 'api/servers/show'
        else
            render json: {errors: 'Server Not Found'}, status: 404           
        end
    end

    def destroy
        @server = Server.find(params[:id])
        if @server
            @server.destroy
            render json: {message: 'Server successfully deleted'}
        else
            render json: {errors: 'Server Not Found'}, status: 404           
        end
    end

    private

    def server_params
        params.require(:server).permit(:title, :owner_id)
    end
end
