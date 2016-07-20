class Api::TracksController < ApplicationController
  def index
    @tracks = Track.all
    render json: @tracks
  end

  def create
    @track = Track.new(title: params[:track][:title],
                        roll: params[:track][:roll])
    if @track.save
      render json: @track, status: 200
    else
      render json: @track.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @track = Track.find(params[:id])

    if @track.destroy
      render json: @track, status: 200
    else
      render json: @track.errors.full_messages, status: :unprocessable_entity
    end
  end

end
