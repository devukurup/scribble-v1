# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @article = build(:article)
  end

  def test_article_should_be_valid
    assert @article.valid?
  end

  def test_article_should_be_invalid_without_title
    @article.title = ""
    assert @article.invalid?
    assert_includes @article.errors.full_messages, "Title can't be blank"
  end

  def test_article_should_be_invalid_without_user
    @article.user = nil
    assert @article.invalid?
    assert_includes @article.errors.full_messages, "User must exist"
  end

  def test_article_should_be_invalid_without_status
    @article.status = ""
    assert @article.invalid?
    assert_includes @article.errors.full_messages, "Status can't be blank"
  end

  def test_date_gets_updated_when_status_is_published
    @article.status = "published"
    @article.save!
    assert_equal Date.current, @article.date
  end

  def test_date_should_not_get_updated_when_status_is_draft
    @article.save!
    assert_nil @article.date
  end
end
