# frozen_string_literal: true

source "https://rubygems.org"
source "https://rails-assets.org"

gem "rails", "~> 5.1.3"

# Fundamental
gem "apartment"
gem "pg"
gem "puma", "~> 3.7"

# Engines
gem "devise"
gem "devise_invitable"

# Lovlevel
gem "active_model_serializers"
gem "acts_as_paranoid"
gem "carrierwave"
gem "composite_primary_keys"
gem "config"
gem "fog-aws"
gem "hash_mapper"
gem "holidays"
gem "kaminari", "~> 1.0.0"
gem "knock"
gem "lp_csv_exportable"
gem "migration_data"
gem "pager_api"
gem "pg_search"
gem "pgreset"
gem "pundit"
gem "rein"
gem "rest-client"
gem "seed-fu"
gem "uglifier"
gem "webpacker"

# ruby extensions
gem "attr_extras"
gem "numeric"

# Trailblazer
gem "reform", "~> 2.2"
gem "reform-rails"
gem "trailblazer"
gem "trailblazer-cells"
gem "trailblazer-rails", "~> 2.1"

# Preprocessors
gem "sass-rails"

# Frontent libraries
gem "bootstrap", "~> 4"
gem "bootstrap3-datetimepicker-rails"
gem "jquery-rails"
gem "momentjs-rails"
gem "select2-rails"
gem "turbolinks"

# Template
gem "font-awesome-rails"
gem "simple_form"
gem "slim-rails"

group :production do
  gem "sentry-raven"
end

group :development do
  gem "guard-rspec", require: false
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "rubocop-rails_config", require: false
  gem "rubocop-rspec", require: false
  gem "web-console", ">= 3.3.0"
end

group :development, :test do
  gem "bullet"
  gem "byebug", platforms: %i[mri mingw x64_mingw]
  gem "factory_bot_rails"
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
  gem "cucumber-api-steps", require: false
  gem "cucumber-rails", require: false
  gem "database_cleaner", require: false
  gem "db-query-matchers"
  gem "selenium-webdriver", require: false
  gem "shoulda-matchers"
  gem "simplecov", require: false
  gem "timecop"
end
