class ServersChannel < ApplicationCable::Channel
    def subscribed
      @server = Server.find_by(id: params[:id])
      stream_for @server
    end
  
    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
    end
  end
  