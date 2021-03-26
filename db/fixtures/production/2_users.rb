# frozen_string_literal: true

if User.none?
  Admin.seed do |s|
    s.id                     = 1
    s.email                  = "admin@lvh.me"
    s.firstname              = "Test"
    s.lastname               = "Test"
    s.password               = "testtest"
    s.selected_project_id    = 1
    s.invitation_accepted_at = Time.zone.now
    s.active                 = !!ENV["SEED_ADMIN_ACTIVE"]
  end
end
