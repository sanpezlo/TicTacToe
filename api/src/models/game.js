const { Schema, model } = require('mongoose')

const gameSchema = new Schema({
  players: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    required: true,
  },
  history: [
    {
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      mark: {
        type: String,
        required: true,
      },
    },
  ],
  board: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    consecutive: {
      type: Number,
      required: true,
    },
    inverted: {
      type: Boolean,
      default: false,
    },
  },
  result: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

gameSchema.set('versionKey', false)
gameSchema.set('timestamps', true)

const Game = model('Game', gameSchema)

module.exports = Game
