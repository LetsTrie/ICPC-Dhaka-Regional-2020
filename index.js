const express = require('express');
const app = express();

app.use('/api/v1', require('./index.route'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server is running at port: ${PORT}`));