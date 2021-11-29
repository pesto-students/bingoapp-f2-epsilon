const admin = require("../firebase-auth/firebase-service");

exports.loginUser = async (req, res) => {
const {
      email,
      password,
    } = req.body;

    const user = await admin.auth().loginUser ({
      email,
      password,
    });

    return res.send(user);
}