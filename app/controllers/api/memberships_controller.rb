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
    end
    
    private

    def membership_params
        params.require(:membership).permit(:membershipable_id, :membershipable_type, :user_id, :accepted)
    end
end
