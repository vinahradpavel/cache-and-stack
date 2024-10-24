const express = require('express');
const {stack, cache} = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/stack', stack);
app.use('/cache', cache);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
