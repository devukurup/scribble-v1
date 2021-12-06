# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_LENGTH = 255

  belongs_to :user

  validates :name, presence: true, length: { maximum: MAX_LENGTH }
end
