class SetNotNullConstrainToOrdinalNumberOnBoardLists < ActiveRecord::Migration[5.1]
  def change
    change_column_null(:issues, :ordinal_number, true)
  end
end
