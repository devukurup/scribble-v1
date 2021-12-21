# frozen_string_literal: true

class Redirection < ApplicationRecord
  MAX_LENGTH = 255

  validates :to_path, presence: true, length: { maximum: MAX_LENGTH }
  validates :from_path, presence: true, uniqueness: true, length: { maximum: MAX_LENGTH }
end
