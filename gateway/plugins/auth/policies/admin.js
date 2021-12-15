const { checkIfAdmin } = require("../firebase-auth/user-auth");

module.exports = {
  name: "admin",
  schema: {
    $id: "http://express-gateway.io/schemas/policies/example-policy.json",
    type: "object",
    properties: {
      baseUrl: {
        type: "string",
        format: "url",
        default: "",
      },
    },
  },
  policy: (actionParams) => {
    const that = this;
    return (req, res, next) => {
      return checkIfAdmin(req, res, next);
    };
  },
};
