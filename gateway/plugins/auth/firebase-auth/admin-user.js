const { admin } = require("./firebase-service");

exports.makeUserAdmin = async (req, res) => {
  const { userId } = req.body;

  await admin.auth().setCustomUserClaims(userId, { admin: true });

  return res.send({ message: "Success" });
};
