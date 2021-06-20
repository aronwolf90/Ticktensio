# frozen_string_literal: true

WikiPage.seed do |s|
  s.id               = 1
  s.title            = "Test page"
  s.wiki_category_id = 1
  s.content          = "Wellcome to ticktensio wiki page.\n\n| What? | Done? |\n| ----- | ----- |\n| Have I tested the wiki feature? | <ul><li class=\"task-list-item checked\" data-te-task=\"\"></li></ul> |\n| Have I tested the tickets feature? | <ul><li class=\"task-list-item\" data-te-task=\"\"></li></ul> |\n| Have I testet the archive feature? | <ul><li class=\"task-list-item\" data-te-task=\"\"></li></ul> |"
end
