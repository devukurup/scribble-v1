# frozen_string_literal: true

class AddContentToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :content, :text, null: false
  end
end
