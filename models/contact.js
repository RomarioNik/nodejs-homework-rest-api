import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleMongooseError } from "../helpers/index.js";
import { validateAtUpdate } from "../helpers/index.js";
import { emailRegexp, phoneRegexp } from "../constants/constants.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: emailRegexp,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.pre("findOneAndUpdate", validateAtUpdate);

contactSchema.post("save", handleMongooseError);
contactSchema.post("findOneAndUpdate", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
});

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export const schemas = {
  addSchema,
  updateStatusContactSchema,
};

export const Contact = model("contact", contactSchema);
