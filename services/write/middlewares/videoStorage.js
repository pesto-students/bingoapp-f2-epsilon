const multer = require("multer");
const shortid = require("shortid");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const accessKeyId = "AKIAYEPRR2X6VMRTCXIT";
const secretAccessKey = "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";

const s3 = new aws.S3({
  accessKeyId,
  secretAccessKey,
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "mp4") {
    cb(null, true);
  } else {
    cb(new Error("Not a mp4 file!"), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "videos");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, originalname);
  },
});
exports.upload = multer({ storage, fileFilter });
exports.uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: "bingo-app",
    // acl: "READ",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  }),
});
