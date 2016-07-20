class Track < ActiveRecord::Base
  validates :title, :roll, presence: true
end
