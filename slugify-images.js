var slugify = require("slugify-files");

slugify(["images/humans/*.*"], (err, sluggedFiles) => {
  console.log(err, sluggedFiles);
  sluggedFiles.forEach((file, idx) => {
    console.log(file.old, "renamed to", file.new);
  });
});
