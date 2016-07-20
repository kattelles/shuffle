class Changetracks < ActiveRecord::Migration
  def change
    remove_column :tracks, :roll, :json
    add_column :tracks, :roll, :text, array: true, default: []
  end
end
