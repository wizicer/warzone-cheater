const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors());
const port = 3912;

app.use(express.static('./dist/'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})