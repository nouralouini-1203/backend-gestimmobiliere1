const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/users");
  },
  filename: function (req, file, cb) {
    const uploadPath = "public/images/users";
    const originalName = file.originalname;
    const fileExtension = path.extname(originalName);
    let filename = originalName;

    // Vérifier si le fichier existe déjà
    let fileIndex = 1;
    while (fs.existsSync(path.join(uploadPath, filename))) {
      const baseName = path.basename(originalName, fileExtension);
      filename = `${baseName}_${fileIndex}${fileExtension}`;
      fileIndex++;
    }

    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

// 🔥 TRÈS IMPORTANT : exporte bien comme ça
module.exports = upload;
