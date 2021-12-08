# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category, only: %i[update destroy]

  def index
    categories = current_user.categories.order("sequence")
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

  def update
    unless @category.update(category_params)
      render status: :unprocessable_entity, json: { error: t("category.update_error") }
    end
  end

  def destroy
    if @category.destroy
      render status: :ok, json: { notice: t("category.successfully_deleted") }
    else
      render status: :unprocessable_entity, json: { error: @category.errors.full_messages.to_sentence }
    end
  end

  private

    def category_params
      params.require(:category).permit(:name, :sequence)
    end

    def load_category
      @category = Category.find_by_id(params[:id])
      unless @category
        render status: :not_found, json: { error: t("category.not_found") }
      end
    end
end
