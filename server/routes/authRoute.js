const router = require("express").Router();
const passport = require("passport");
const authController = require("../controller/authController");

//hitting /google path when we click on sign in btn from frontend that will redirect to google login page here we will check via
//passport.authenticate() method to check which stratergy we are using...ie google stratergy then
//as user clicks on login button user profile and email will be fetched
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

//now to hit on googlecallback path after user selects gmail account from popup model and redirect to frontend dashboard with token
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleCallback,
);

//returning userr by checking whether stratergy is jwt or not and then calling getUser method from authController
//to get user if present
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  authController.getUser,
);

router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
  res.status(200).json({ message: "Logout successful" });
});

module.exports = router;
