class StaticPagesController < ApplicationController
  def root
    render :file => '../../index.html'
  end
end
