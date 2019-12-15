class SetValueForOrdinalNumber < ActiveRecord::Migration[5.1]
  def data
    BoardList.find_each do |board_list|
      board_list.issues.ordered.each.with_index do |issue, index|
        issue.update!(ordinal_number: index)
      end
    end
  end
end
