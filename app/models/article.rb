# frozen_string_literal: true

class Article < ApplicationRecord
  MAX_LENGTH = 255

  enum status: { draft: "draft", published: "published" }

  belongs_to :user
  belongs_to :category

  validates :title, presence: true, length: { maximum: MAX_LENGTH }
  validates :status, presence: true

  before_validation :set_published_date

  private

    def set_published_date
      if self.date.nil?
        self.date = Date.current if self.published?
      else
        self.date = nil if self.draft?
      end
    end
end
