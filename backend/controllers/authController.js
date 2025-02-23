const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Hardcoded credentials
  const validUser = "naval.ravikant";
  const validPass = "05111974";

  if (username === validUser && password === validPass) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return res.status(200).json({ JWT: token });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
};
