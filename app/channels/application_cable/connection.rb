module ApplicationCable
  class Connection < ActionCable::Connection::Base

    identified_by :current_user
    
    def connect
      # invoked upon new client-server connection 
      # initialize identifying information
      # can't use application controller methods
      self.current_user = find_verified_user
    end

    def disconnect

    end

    private

    def find_verified_user
      if current_user = User.find_by(session_token: request.session[:session_token])
        current_user
      else
        reject_unauthorized_connection
      end
    end
    
  end
end
