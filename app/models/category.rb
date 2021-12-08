# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_LENGTH = 255
  acts_as_list column: :sequence

  belongs_to :user

  validates :name, presence: true, length: { maximum: MAX_LENGTH }
end
