# frozen_string_literal: true

class SessionsController < Devise::SessionsController
  def create
    if Apartment::Tenant.current == "public" && Settings.multi_tenant
      session[:organization_display_name] = params[:organization]

      if organization.present?
        redirect_to helpers.organization_sign_in_url(organization)
      else
        redirect_to new_user_session_path
      end
    else
      super
      cookies[:csrf_token] = helpers.form_authenticity_token
      cookies[:signed_in] = true
    end
  end

  def destroy
    super
    cookies[:signed_in] = nil
  end

private
  def organization
    @organization ||=
      Organization.find_by(name: params[:organization].to_domain)
  end
end
