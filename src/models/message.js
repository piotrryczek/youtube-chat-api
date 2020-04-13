import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema({
  ytMessageId: {
    type: Schema.Types.String,
    required: true,
  },
  content: {
    type: Schema.Types.String,
  },
  authorName: {
    type: Schema.Types.String,
    required: true,
  },
  isOwner: {
    type: Schema.Types.Boolean,
    default: false,
  },
  isSponsor: {
    type: Schema.Types.Boolean,
    default: false,
  },
  isModerator: {
    type: Schema.Types.Boolean,
    default: false,
  },
  isQuestion: {
    type: Schema.Types.Boolean,
    default: false,
  },
}, {
  timestamps: true,
  versionKey: false,
});

MessageSchema.statics.getLast = async function (limit = 30) {
  return this.find({}, {}, { sort: { _id: -1 } }).limit(limit);
};

export default mongoose.models.MessageSchema || mongoose.model('Message', MessageSchema);
