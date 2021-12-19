# frozen_string_literal: true

class Site < ApplicationRecord
  MAX_LENGTH = 30

  validates :name, presence: true, length: { maximum: MAX_LENGTH }
  validates :password, length: { minimum: 6 }, if: -> { password.present? }

  has_secure_password validations: false
end
