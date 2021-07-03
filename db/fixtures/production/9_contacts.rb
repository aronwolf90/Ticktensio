# frozen_string_literal: true

Contact.bulk_insert(
  :id,
  :project_id,
  :name,
  :email,
  :description,
  :telephone,
  :mobile,
  :fax,
  :address_city,
  :address_zip,
  :address_street,
  :address_number,
  :address_country,
  :created_at,
  :updated_at
) do |worker|
  worker.add(
    id: 1,
    name: "Test contact",
    email: "test@ticktensio.com",
    description: "Test description",
    telephone: "0101010101",
    mobile: "0202020202",
    fax: "0303030303",
    address_city: "Augsburg",
    address_zip: "010101",
    address_street: "Las Holletas",
    address_number: 5,
    address_country: "German",
    created_at: Time.zone.now,
    updated_at: Time.zone.now
  )
end
