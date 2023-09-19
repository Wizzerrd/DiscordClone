class Api::MembershipsController < ApplicationController
    wrap_parameters include: Membership.attribute_names

    def show
        @membership = Membership.find(params[:id])
        if @membership
            render 'api/memberships/show'
        else
            render json: {error: 'Not Found'}, status: 404
        end
    end

    def create
        @membership = Membership.new(membership_params)
        if @membership.save!
            render 'api/memberships/show'
        else
            render json: {error: 'Problem creating membership'}, status: 422
        end
    end

    def destroy
        if(params[:server_id])
            @membership = Membership.where(membershipable_type: 'Server').where(membershipable_id: params[:server_id]).find_by(user_id: params[:user_id])
        elsif(params[:channel_id])
            
        end
        if @membership
            @membership.destroy
            @membership = nil
            render json: {message: 'successfully left server'}
        else
            render json: {error: 'Not Found'}, status: 404
        end
    end
    
    private

    def membership_params
        params.require(:membership).permit(:membershipable_id, :membershipable_type, :user_id, :accepted)
    end
end
