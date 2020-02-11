# frozen_string_literal: true

17.times do |n|
  Notification.seed do |s|
    s.id          = n + 1
    s.subject     = "Nofification #{n+1}"
    s.body        = "body #{n+1}"
    s.user_id     = 1
    s.created_at  = "2020-02-11T22:01:54.824+01:00"
  end
end
