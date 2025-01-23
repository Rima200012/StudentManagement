module.exports = app => {
    const authController = require("../controllers/authcontroller");

    var router = require("express").Router();

    // Register student (user)
    router.post("/register", authController.register);

    // Login (admin or student)
    router.post("/login", authController.login);

    // Get user details (for authenticated users)
    router.get("/getStudentDetails", authController.getStudentDetails);

    app.use('/api/auth', router);
};

