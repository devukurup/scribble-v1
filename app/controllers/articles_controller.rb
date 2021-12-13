# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article, only: %i[destroy update]

  def index
    @articles = Article.all
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

  def destroy
    if @article.destroy
      render status: :ok, json: { notice: t("article.successfully_deleted") }
    else
      render status: :unprocessable_entity, json: { error: @article.errors.full_messages.to_sentence }
    end
  end

  def update
    if @article.update(article_params)
      render status: :ok, json: { notice: t("article.successfully_updated") }
    else
      render status: :unprocessable_entity, json: { error: @article.errors.full_messages.to_sentence }
    end
  end

  private

    def article_params
      params.require(:article).permit(:title, :content, :status, :category_id)
    end

    def load_article
      @article = Article.find_by_id(params[:id])
      unless @article
        render status: :not_found, json: { error: t("article.not_found") }
      end
    end
end
