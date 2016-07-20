class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.json "roll", null: false

      t.timestamps
    end
  end
end
