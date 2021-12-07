# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    categories = current_user.categories.order("created_at DESC")
    render status: :ok, json: { categories: categories }
  end

  def create
    category = current_user.categories.new(category_params)
    if category.save
      render status: :ok, json: { notice: t("category.successfully_created") }
    else
      error = category.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
