module.exports = (req, port) => {
  if(process.env.NODE_ENV === 'production') {
    return req.protocol + '://' + req.get('host');
  } else {
    return `http://localhost:${port}`;
  }
};
