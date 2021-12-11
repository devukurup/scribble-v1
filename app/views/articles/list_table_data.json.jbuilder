# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article,
    :id,
    :title,
    :first_name,
    :last_name,
    :date,
    :name,
    :status

end
