# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article,
    :id,
    :title,
    :status,
    :content
  json.date article.date.present? ? article.date : "-"
  json.name article.category ? article.category.name : "-"
  json.first_name article.user.first_name
  json.last_name article.user.last_name

end
