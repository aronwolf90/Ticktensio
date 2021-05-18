# frozen_string_literal: true

source "https://rubygems.org"
source "https://rails-assets.org"

gem "rails", "~> 6.0.3"

# Fundamental
gem "pg"
gem "puma", "~> 5.3"
gem "ros-apartment", require: "apartment"

# Engines
gem "devise"
gem "devise_invitable"

# Low level
gem "active_model_serializers"
gem "active_record_union"
gem "acts_as_paranoid"
gem "bulk_insert"
gem "carrierwave"
gem "composite_primary_keys"
gem "config"
gem "dry-struct"
gem "dry-validation"
gem "fog-aws"
gem "hash_mapper"
gem "holidays"
gem "kaminari", "~> 1.2.1"
gem "knock"
gem "lp_csv_exportable"
gem "migration_data"
gem "pagy"
gem "pager_api"
gem "pg_search"
gem "pgreset"
gem "pundit"
gem "rein"
gem "rest-client"
gem "sidekiq"
gem "sidekiq-cron"
gem "uglifier"
gem "webpacker", "~> 3.5.3"

# ruby extensions
gem "attr_extras"
gem "numeric"

# Trailblazer
gem "reform"
gem "reform-rails"
gem "trailblazer"
gem "trailblazer-cells"
gem "trailblazer-context"
gem "trailblazer-operation"
gem "trailblazer-rails"

# Template
gem "simple_form"
gem "slim-rails"

# Apis
gem "google-api-client", require: "google/apis/calendar_v3"

# Other
gem "sidekiq_alive"
gem "recaptcha", require: "recaptcha/rails"

group :production do
  gem "sentry-raven"
end

group :development do
  gem "guard-rspec", require: false
  gem "listen"
  gem "rubocop"
  gem "rubocop-rails_config", require: false
  gem "rubocop-rspec", require: false
  gem "web-console", ">= 3.3.0"
end

group :development, :test do
  gem "bullet"
  gem "byebug", platforms: %i[mri mingw x64_mingw]
  gem "factory_bot_rails"
  gem "hashdiff"
  gem "rails-controller-testing"
  gem "rspec-rails"

  # static code analyzers
  gem "traceroute"

  # preloaders
  gem "bootsnap", require: false
  gem "spring"
  gem "spring-commands-rspec"
  gem "spring-watcher-listen"
end

group :test do
  gem "capybara"
  gem "cucumber-rails", require: false
  gem "db-query-matchers"
  gem "jsonpath", require: false
  gem "selenium-webdriver", require: false
  gem "shoulda-matchers"
  gem "simplecov", require: false
  gem "timecop"
  gem "vcr"
  gem "webmock"
end
