class StaticPagesController < ActionController::Base
    def frontend
        render file: Rails.root.join('frontend', 'public', 'index.html')
    end
end


