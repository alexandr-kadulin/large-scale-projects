import mongoose from 'mongoose';

const VerbSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Please provide keyword!'],
    trim: true,
    maxlength: [20, 'Keyword can not be more than 20 characters!'],
  },
  maInfinitive: {
    type: String,
    required: [true, 'Please provide ma-infinitive form!'],
    trim: true,
    maxlength: [20, 'Ma-infinitive form can not be more than 20 characters!'],
  },
  daInfinitive: {
    type: String,
    required: [true, 'Please provide da-infinitive form!'],
    trim: true,
    maxlength: [20, 'Da-infinitive form can not be more than 20 characters!'],
  },
  presentTense: {
    type: String,
    required: [true, 'Please provide verb in present tense!'],
    trim: true,
    maxlength: [
      20,
      'Verb in present tense can not be more than 20 characters!',
    ],
  },
  pastTense: {
    type: String,
    required: [true, 'Please provide verb in past tense!'],
    trim: true,
    maxlength: [20, 'Verb in past tense can not be more than 20 characters!'],
  },
  examples: {
    type: [
      {
        type: String,
        maxlength: [80, 'Example can not be more than 20 characters!'],
      },
    ],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user!'],
  },
  type: {
    type: String,
    enum: ['noun', 'verb'],
    required: [true, 'Please provide type!'],
  },
});

export default mongoose.model('Verb', VerbSchema);
