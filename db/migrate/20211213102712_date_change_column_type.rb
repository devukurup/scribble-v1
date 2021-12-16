# frozen_string_literal: true

class DateChangeColumnType < ActiveRecord::Migration[6.1]
  def change
    change_column :articles, :date, :string
  end
end
