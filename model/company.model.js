import mongoose from "mongoose";
const companySchema=mongoose.Schema({
    id: {
    type: String,
    required: true,
    unique: true, // ensures no duplicates like "facebook", "google", etc.
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: {
    type: [String], // array of strings
    default: [],
  },
  category: {
    type: String,
    enum: ['free', 'paid'], // assuming only these two are allowed
    required: true,
  },
  image: {
    type: String, // base64 encoded string or URL
    required: true,
  }

});
const Company=mongoose.model('Company',companySchema);
export default Company;