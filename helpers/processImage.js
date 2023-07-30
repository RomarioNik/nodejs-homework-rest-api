import Jimp from "jimp";
import HttpError from "./HttpError.js";

const processImage = (imagePath) => {
  Jimp.read(imagePath)
    .then((image) => {
      image.resize(250, 250).quality(80).write(imagePath);
    })
    .catch((error) => {
      throw HttpError(500);
    });
};

export default processImage;
