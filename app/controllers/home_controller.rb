# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :redirect, only: %i[index]
  def index
    render
  end

  private

    def redirect
      path = "/#{params[:path]}"
      redirection = Redirection.find_by_from_path(path)
      if redirection
        redirect_to redirection.to_path, status: 301
      end
    end
end
