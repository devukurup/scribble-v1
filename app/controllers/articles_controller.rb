# frozen_string_literal: true

class ArticlesController < ApplicationController
  def list_table_data
    @articles = Article.joins(:user, :category)
      .select("articles.*, categories.name, users.first_name, users.last_name")
  end

  def create
    article = current_user.articles.new(article_params)
    if article.save
      render status: :ok, json: { notice: t("article.successfully_created") }
    else
      error = article.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  private

    def article_params
      params.require(:article).permit(:title, :content, :status, :category_id)
    end
end
