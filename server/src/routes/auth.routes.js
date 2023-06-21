const express = require("express");
const router = express.Router();
const { checkDuplicateUsernameOrEmail } = require("../middleware/verifySignUp");
const { signup, signin } = require("../controllers/auth.controller")

router.use((req, res, next) => {
  res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/auth/signup", checkDuplicateUsernameOrEmail, signup);
router.post("/auth/signin", signin);

module.exports = router;