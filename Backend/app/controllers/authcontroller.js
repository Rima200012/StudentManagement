// Import dependencies
const { registerStudent, loginStudent, getStudentFromToken } = require("../service/authservice.js");

// Register a new student
exports.register = (req, res) => {
    const { name, age, email, phone, password, userType, gender, Studentclass } = req.body;

    // Validate required fields
    if (!name || !age || !email || !phone || !password ) {
        return res.status(400).send({
            success: false,
            message: "All fields are required",
        });
    }

    const student = { name, age, email, phone, password, userType, gender, Studentclass };

    // Register student using the auth service
    registerStudent(student, (err, response) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: "Registration failed. Please try again later.",
            });
        } else if (response.success) {
            res.status(201).send(response);
        } else {
            res.status(400).send(response);
        }
    });
};

// Student login
exports.login = (req, res) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        return res.status(400).send({
            success: false,
            message: "Email and password are required",
        });
    }

    // Call loginStudent function from auth service
    loginStudent(email, password, (err, response) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: "Login failed. Please try again later.",
            });
        } else if (response.success) {
            res.status(200).send(response);
        } else {
            res.status(401).send(response);
        }
    });
};

// Get student details from token
exports.getStudentDetails = (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).send({
            success: false,
            message: "Token not provided",
        });
    }

    // Fetch student details using the token
    getStudentFromToken(token, (err, response) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: "Failed to retrieve student details",
            });
        } else if (response.success) {
            res.status(200).send({
                success: true,
                student: response.student,
            });
        } else {
            res.status(401).send({
                success: false,
                message: response.message,
            });
        }
    });
};
