# frozen_string_literal: true

json.site do
  json.extract! @site,
    :name,
    :password_digest
end
