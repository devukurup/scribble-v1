# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    title { Faker::Lorem.sentence[0..20] }
    status { "draft" }
    content { Faker::Lorem.sentence[0..50] }
    user
    category
  end
end
