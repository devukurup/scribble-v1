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

  def test_category_should_be_invalid_without_user
    @category.user = nil
    assert @category.invalid?
    assert_includes @category.errors.full_messages, "User must exist"
  end

  def test_category_should_have_sequence_number
    @category.save
    assert_equal @category.sequence, 1
  end

  def test_category_should_not_be_valid_and_saved_if_name_not_unique
    @category.save!
    test_category = @category.dup
    assert test_category.invalid?
    assert_includes test_category.errors.full_messages, "Name has already been taken"
  end

  def test_name_should_be_saved_in_lowercase
    uppercase_name = "GETTING STARTED"
    @category.update!(name: uppercase_name)
    assert_equal uppercase_name.downcase, @category.name
  end
end
