# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = build(:category)
  end

  def test_category_should_be_valid
    assert @category.valid?
  end

  def test_category_should_be_invalid_without_name
    @category.name = ""
    assert @category.invalid?
    assert_includes @category.errors.full_messages, "Name can't be blank"
  end

  def test_category_should_be_invalid_without_quiz
    @category.user = nil
    assert @category.invalid?
    assert_includes @category.errors.full_messages, "User must exist"
  end
end
