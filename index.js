const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(bodyParser.json());

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}


const corsOptions = {
  origin: "https://angular-auth-front-login.vercel.app/", 
  optionsSuccessStatus: 200, 
};
app.use(cors(allowCors));

app.post("/sign", (req, res) => {
  const email = "alvarobraz83@gmail.com";
  const password = "1234567";

  if (req.body.email === email && req.body.password === password) {
    const data = {
      nome: "Álvaro Braz",
      email,
      role: ["sysAdmin"],
    };

    const token = jwt.sign({ data }, "SECRET", {
      expiresIn: 100000,
    });

    return res.json({ token: token });
  }

  res.status(500).json({ message: "Usuário ou senha incorreta" });
});

app.listen(port, () => {
  console.log(`Link => http://localhost:${port}`);
});