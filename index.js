const express = require('express');
const path = require('path')
const app = express();
const bodyParser = require('body-parser');

const port = 2000;
// app.use(`./routes/user/`, user);
app.use(express.json());
// app.use(expressValidator())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', require(path.join(__dirname, 'routes/user/user.js')))

app.listen(port, () => {
    console.log(`App is running on :${port}`)
})