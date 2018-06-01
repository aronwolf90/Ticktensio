# frozen_string_literal: true

require "reform/form/coercion"

module Administration
  class UserForm < Reform::Form
    feature Coercion
    model User

    property :firstname
    property :lastname
    property :email
    property :password
    property :password_confirmation

    validation with: { form: true } do
      configure do
        predicates(ReformPredicates)

        def same_password?(value)
          value == form.password
        end
      end

      required(:firstname).filled
      required(:lastname).filled
      required(:email).filled
      required(:password).filled
      required(:password_confirmation).filled(:same_password?)
    end
  end
end
