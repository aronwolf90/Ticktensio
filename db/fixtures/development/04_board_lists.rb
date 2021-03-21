# frozen_string_literal: true

BoardList.bulk_insert(
  :id,
  :name,
  :project_id,
  :kind,
  :created_at,
  :updated_at,
) do |worker|
  worker.add(
    id: 4,
    name: "Backlog",
    project_id: 1,
    kind: "open",
    created_at: Time.zone.now,
    updated_at: Time.zone.now
  )

  worker.add(
    id: 5,
    name: "In development",
    project_id: 1,
    kind: "other",
    created_at: Time.zone.now,
    updated_at: Time.zone.now
  )

  worker.add(
    id: 6,
    name: "Closed",
    project_id: 1,
    kind: "closed",
    created_at: Time.zone.now,
    updated_at: Time.zone.now
  )

  index = 0
  (2..10).each do |project_id|
    worker.add(
      id: index + 7,
      name: "Test project #{project_id} open",
      project_id: project_id,
      kind: "open",
      created_at: Time.zone.now,
      updated_at: Time.zone.now
    )

    worker.add(
      id: index + 8,
      name: "In development",
      project_id: project_id,
      kind: "other",
      created_at: Time.zone.now,
      updated_at: Time.zone.now
    )

    worker.add(
      id: index + 9,
      name: "Closed",
      project_id: project_id,
      kind: "closed",
      created_at: Time.zone.now,
      updated_at: Time.zone.now
    )
    index += 3
  end
end
