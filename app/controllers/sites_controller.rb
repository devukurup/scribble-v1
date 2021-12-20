# frozen_string_literal: true

class SitesController < ApplicationController
  before_action :load_site, only: %i[show update]

  def show
    render
  end

  def update
    if @site.update(site_params)
      render status: :ok, json: { notice: t("site.successfully_updated") }
    else
      render status: :unprocessable_entity, json: { error: t("site.update_error") }
    end
  end

  private

    def site_params
      params.require(:site).permit(:name, :password)
    end

    def load_site
      @site = Site.first
      unless @site
        render status: :not_found, json: { error: t("site.not_found") }
      end
    end
end
