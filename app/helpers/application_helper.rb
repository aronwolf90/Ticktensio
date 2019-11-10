# frozen_string_literal: true

require "uri"

module ApplicationHelper
  include Pundit
  include FontAwesome::Rails::IconHelper
  include BtnHelper
  include MenuHelper
  include AssideHelper

  def flash_class(level)
    case level.to_sym
    when :notice then "alert alert-info"
    when :success then "alert alert-success"
    when :error then "alert alert-danger"
    when :alert then "alert alert-warn"
    end
  end

  def seconds_to_time(seconds)
    [seconds / 3600, seconds / 60 % 60, seconds % 60].map do |time|
      time.to_i.to_s.rjust(2, "0")
    end.join(":")
  end

  def standard_btn(name, link)
    link_to name, link, class: "btn btn-success"
  end

  def organization_sign_in_url(organization)
    request.protocol + [
      organization.name,
      "#{request.host_with_port}/users/sign_in"
    ].join(".")
  end

  def organization_url(organization)
    if Settings.multi_tenant
      [organization.name, Settings.host].join(".")
    else
      Settings.host
    end
  end

  def dropdown_link(*args, **options, &block)
    options[:class] ||= ""
    options[:class] += " dropdown-item"
    link_to(*args, options, &block)
  end

  def link(object, url)
    if policy(object).show?
      link_to object, url, class: "text-dark"
    else
      object
    end
  end

  def edit_link(object, url)
    if policy(object).edit?
      link_to object, url, class: "text-dark"
    else
      object
    end
  end
end
