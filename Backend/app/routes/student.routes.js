module.exports = app => {
    const students = require("../controllers/student.controller");

    var router = require("express").Router();

    //create new student
    router.post("/", students.create);

    //get all students

    router.get("/", students.findAll);

    //get student by id

    router.get("/:id", students.findOne);

    //update student by id

    router.put("/:id", students.update);

    //delete student by id

    router.delete("/:id", students.delete);

    //delete all students

    router.delete("/", students.deleteAll);

    app.use('/api/students', router);

};