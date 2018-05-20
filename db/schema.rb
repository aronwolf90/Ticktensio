# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180520123954) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "board_lists", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "ordinal_number"
    t.bigint "project_id"
    t.index ["project_id"], name: "index_board_lists_on_project_id"
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "issue_id"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["issue_id"], name: "index_comments_on_issue_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "departments", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "issues", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title", null: false
    t.text "description"
    t.bigint "user_id"
    t.decimal "complexity", precision: 2, scale: 1
    t.integer "board_list_id", null: false
    t.integer "ordinal_number"
    t.index ["board_list_id"], name: "index_issues_on_board_list_id"
    t.index ["user_id"], name: "index_issues_on_user_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "records", force: :cascade do |t|
    t.datetime "start_time"
    t.datetime "end_time"
    t.bigint "user_id"
    t.bigint "issue_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["issue_id"], name: "index_records_on_issue_id"
    t.index ["user_id"], name: "index_records_on_user_id"
    t.index ["user_id"], name: "unique_active_record_per_user", unique: true, where: "(end_time IS NULL)"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer "invitation_limit"
    t.string "invited_by_type"
    t.bigint "invited_by_id"
    t.integer "invitations_count", default: 0
    t.string "firstname"
    t.string "lastname"
    t.integer "gender"
    t.string "avatar"
    t.integer "selected_project_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["invitation_token"], name: "index_users_on_invitation_token", unique: true
    t.index ["invitations_count"], name: "index_users_on_invitations_count"
    t.index ["invited_by_id"], name: "index_users_on_invited_by_id"
    t.index ["invited_by_type", "invited_by_id"], name: "index_users_on_invited_by_type_and_invited_by_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["selected_project_id"], name: "index_users_on_selected_project_id"
  end

  create_table "wiki_pages", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "board_lists", "projects"
  add_foreign_key "comments", "users"
  add_foreign_key "issues", "board_lists"
  add_foreign_key "records", "issues", on_delete: :nullify
  add_foreign_key "records", "users"
  add_foreign_key "users", "projects", column: "selected_project_id"

  create_view "record_days",  sql_definition: <<-SQL
      SELECT (records.start_time)::date AS day,
      records.user_id
     FROM records
    GROUP BY ((records.start_time)::date), records.user_id;
  SQL

end
