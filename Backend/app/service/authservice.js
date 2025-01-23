// Import the Student model
const Student = require("../models/student.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Retrieve the secret key from the environment variables
const SECRET_KEY = process.env.JWT_SECRET;

// Register a new student
exports.registerStudent = (student, result) => {
    // Hash the password before saving
    bcrypt.hash(student.password, 10, (err, hashedPassword) => {
        if (err) {
            result(err, null);
            return;
        }

        // Create the student object with hashed password
        const newStudent = {
            ...student,
            password: hashedPassword
        };

        // Save the student to the database
        Student.create(newStudent, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, { success: true, message: "Student registered successfully" });
        });
    });
};

// Login student
exports.loginStudent = (email, password, result) => {
    // Find student by email
    Student.findByEmail(email, (err, student) => {
        if (err) {
            result(err, null);
            return;
        }

        if (!student) {
            result({ success: false, message: "Student not found" }, null);
            return;
        }

        // Compare the password with the hashed password in the database
        bcrypt.compare(password, student.password, (err, isMatch) => {
            if (err) {
                result(err, null);
                return;
            }

            if (!isMatch) {
                result({ success: false, message: "Invalid password" }, null);
                return;
            }

            // Generate JWT token
            const token = jwt.sign({ id: student.id, email: student.email }, SECRET_KEY, { expiresIn: "1h" });

            result(null, { success: true, message: "Login successful", token });
        });
    });
};

// Get student details from the token
exports.getStudentFromToken = (token, result) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            result({ success: false, message: "Invalid token" }, null);
            return;
        }

        // Find student by ID
        Student.findById(decoded.id, (err, student) => {
            if (err) {
                result(err, null);
                return;
            }

            result(null, { success: true, student });
        });
    });
};
