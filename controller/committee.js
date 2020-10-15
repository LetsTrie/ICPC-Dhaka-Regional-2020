const fs = require('fs').promises;
const path = require('path');

exports.sendFile = async (req, res, next) => {
  const { slug } = req.params;
  const pdf = await fs.readFile(
    path.join(__dirname, '..', 'data', 'committee', `${slug}`)
  );
  res.contentType = 'application/pdf';
  res.send(pdf);
};
