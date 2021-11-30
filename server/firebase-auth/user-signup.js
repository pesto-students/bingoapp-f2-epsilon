const { admin } = require("./firebase-service");

exports.createUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await admin.auth().createUser({
    email,
    password,
  });

  return res.send(user);
};
