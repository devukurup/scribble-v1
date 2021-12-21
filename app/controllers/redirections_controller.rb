# frozen_string_literal: true

class RedirectionsController < ApplicationController
  before_action :load_redirection, only: %i[update destroy]

  def index
    @redirections = Redirection.all
  end

  def create
    redirection = Redirection.new(redirection_params)
    if redirection.save
      render status: :ok, json: { notice: t("redirection.successfully_created") }
    else
      error = redirection.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  def destroy
    if @redirection.destroy
      render status: :ok, json: { notice: t("redirection.successfully_deleted") }
    else
      render status: :unprocessable_entity, json: { error: @redirection.errors.full_messages.to_sentence }
    end
  end

  def update
    if @redirection.update(redirection_params)
      render status: :ok, json: { notice: t("redirection.successfully_updated") }
    else
      render status: :unprocessable_entity, json: { error: @redirection.errors.full_messages.to_sentence }
    end
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from_path, :to_path)
    end

    def load_redirection
      @redirection = Redirection.find_by_id(params[:id])
      unless @redirection
        render status: :not_found, json: { error: t("redirection.not_found") }
      end
    end
end
