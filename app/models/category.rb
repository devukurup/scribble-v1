# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_LENGTH = 255
  acts_as_list column: :sequence

  belongs_to :user

  validates :name, presence: true, uniqueness: true, length: { maximum: MAX_LENGTH }

  before_validation :to_lowercase

  private

    def to_lowercase
      name.downcase!
    end
end
