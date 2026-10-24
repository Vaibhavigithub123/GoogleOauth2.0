const jwt = require("jsonwebtoken");

exports.googleCallback = (req, res) => {
  try {
    //token generate
    const token = jwt.sign({ sub: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    //set token in httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    //redirect to frontend dashboard with token
    res.redirect(`${process.env.UI_URL}/success-login?access_token=${token}`);
  } catch (error) {
    console.error("Error in Google callback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get user profile
exports.getUser = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    res.json({
      user: req.user,
    });
  } catch (error) {
    console.error("Error in getting user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
