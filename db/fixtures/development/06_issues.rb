# frozen_string_literal: true


Issue.bulk_insert(
  :id,
  :board_list_id,
  :global_board_list_id,
  :complexity,
  :user_id,
  :created_by_id,
  :title,
  :description,
  :ordinal_number,
  :global_ordinal_number,
  :due_at,          
  :deadline_at,
  :created_at,
  :updated_at
) do |worker|
  worker.add(
    id:                    1,
    board_list_id:         4,
    global_board_list_id:  1,
    complexity:            2,
    user_id:               1,
    created_by_id:         1,
    title:                 "Test issue 1",
    description:           "description for the test issue",
    ordinal_number:        3,
    global_ordinal_number: 3,
    due_at:                Time.zone.parse("10-10-2020 00:00"),
    deadline_at:           Time.zone.parse("10-10-2020 00:00"),
    created_at:            Time.zone.parse("9-10-2020 10:10:00"),
    updated_at:            Time.zone.parse("9-10-2020 10:10:00")
  )

  worker.add(
    id:                    2,
    board_list_id:         4,
    global_board_list_id:  1,
    complexity:            2,
    user_id:               1,
    created_by_id:         1,
    title:                 "Test issue 2",
    description:           "description for the test issue",
    ordinal_number:        2,
    global_ordinal_number: 2,
    created_at:            Time.zone.parse("9-10-2020 10:10:01"),
    updated_at:            Time.zone.parse("9-10-2020 10:10:01")
  )

  worker.add(
    id:                    3,
    board_list_id:         4,
    global_board_list_id:  1,
    complexity:            3,
    created_by_id:         1,
    title:                 "Test issue 3",
    description:           "description for the test issue",
    ordinal_number:        1,
    global_ordinal_number: 1,
    created_at:            Time.zone.parse("9-10-2020 10:10:02"),
    updated_at:            Time.zone.parse("9-10-2020 10:10:02")
  )

  worker.add( 
    id:                    4,
    board_list_id:         4,
    global_board_list_id:  1,
    complexity:            5,
    created_by_id:         1,
    title:                 "Test issue 4",
    description:           "description for the test issue",
    ordinal_number:        0,
    global_ordinal_number: 0,
    created_at:            Time.zone.parse("9-10-2020 10:10:03"),
    updated_at:            Time.zone.parse("9-10-2020 10:10:03")
  )

  worker.add(
    id:                    5,
    board_list_id:         5,
    global_board_list_id:  2,
    complexity:            8,
    created_by_id:         1,
    title:                 "Test issue 5",
    description:           "description for the test issue",
    ordinal_number:        2,
    global_ordinal_number: 2,
    created_at:            Time.zone.parse("9-10-2020 10:10:04"),
    updated_at:            Time.zone.parse("9-10-2020 10:10:04")
  )

  worker.add(
    id:                    6,
    board_list_id:         5,
    global_board_list_id:  2,
    complexity:            2,
    created_by_id:         1,
    title:                 "Test issue 6",
    description:           "description for the test issue",
    ordinal_number:        1,
    global_ordinal_number: 1,
    created_at:            Time.zone.parse("9-10-2020 10:10:05"),
    updated_at:            Time.zone.parse("9-10-2020 10:10:05")
  )

  worker.add(
    id:                    7,
    board_list_id:         5,
    global_board_list_id:  2,
    complexity:            8,
    created_by_id:         1,
    title:                 "Test issue 7",
    description:           "description for the test issue",
    ordinal_number:        0,
    global_ordinal_number: 0,
    created_at:            Time.zone.parse("9-10-2020 10:10:06"),
    updated_at:            Time.zone.parse("9-10-2020 10:10:06")
  )

  worker.add(
    id:                    8,
    board_list_id:         6,
    global_board_list_id:  3,
    complexity:            1,
    created_by_id:         1,
    title:                 "Test issue 8",
    description:           "description for the test issue",
    ordinal_number:        3,
    global_ordinal_number: 3,
    created_at:            Time.zone.parse("9-10-2020 10:10:07"),
    updated_at:            Time.zone.parse("9-10-2020 10:10:07")
  )

  worker.add(
    id:                    9,
    board_list_id:         6,
    global_board_list_id:  3,
    complexity:            8,
    created_by_id:         1,
    title:                 "Test issue 9",
    description:           "description for the test issue",
    ordinal_number:        2,
    global_ordinal_number: 2,
    created_at:            Time.zone.parse("9-10-2020 10:10:08"),
    updated_at:            Time.zone.parse("9-10-2020 10:10:08")
  )

  worker.add(
    id:                    10,
    board_list_id:         6,
    global_board_list_id:  3,
    complexity:            3,
    created_by_id:         1,
    title:                 "Test issue 10",
    description:           "description for the test issue",
    ordinal_number:        1,
    global_ordinal_number: 1,
    created_at:            Time.zone.parse("9-10-2020 10:10:09"),
    updated_at:            Time.zone.parse("9-10-2020 10:10:09")
  )

  worker.add(
    id:                    11,
    board_list_id:         6,
    global_board_list_id:  3,
    complexity:            5,
    title:                 "Test issue 11",
    description:           "description for the test issue",
    ordinal_number:        0,
    global_ordinal_number: 0,
    created_at:            Time.zone.parse("9-10-2020 10:10:10"),
    updated_at:            Time.zone.parse("9-10-2020 10:10:10")
  )

  worker.add(
    id:                    12,
    board_list_id:         7,
    global_board_list_id:  1,
    complexity:            5,
    title:                 "Test issue 12",
    description:           "description for the test issue",
    ordinal_number:        0,
    global_ordinal_number: 4,
    created_at:            Time.zone.parse("9-10-2020 10:10:11"),
    updated_at:            Time.zone.parse("9-10-2020 10:10:11")
  )
end
