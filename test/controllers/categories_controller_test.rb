# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
  end

  def test_should_list_all_categories
    get categories_path
    assert_response :success
  end

  def test_should_create_valid_category
    post categories_path, params: { category: { name: "Getting Started" } }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("category.successfully_created")
  end

  def test_should_update_category
    put category_path(@category.id), params: { category: { name: "Getting Started" } }
    assert_response :success
  end

  def test_should_destroy_category
    assert_difference "Category.count", -1 do
      delete category_path(@category.id)
    end
  end
end
