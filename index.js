const express = require('express');
const path = require('path');
//const cors = require('cors');

const app = express();
let port = process.env.PORT;
if (port == null || port == '') {
  port = 8000;
}

//app.use(express.json());
//app.use(express.urlencoded({extended: true}));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://r2f-dev-ed.lightning.force.com");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use('/', express.static(path.resolve(__dirname, './public')));
//app.use(cors());
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.listen(port, () => console.log(`Server listening port - ${port}`));