const Student = require("../models/student.model");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "content cannot be empty!"
        });
    }

    const student = new Student({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        phone: req.body.phone
    });

    //save student in db

    Student.create(student, (err, data) => {
        if (err) {
            res.status(400).send({
                message: 
                err.message || "Some error occured while creating the student!"
            });
        
        } else res.send(data);
    });
  
};

// Retrieve all students from the database (with condition).
exports.findAll = (req, res) => {
    const name = req.query.title;

    Student.getAll(name, (err, data) => {
        if (err)
            res.status(500).send({
        message: 
    err.message || "some error occured while retrieving students."});
    else res.send(data);
    });
  
};

// Find a single student with a id
exports.findOne = (req, res) => {
    Student.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found student with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving student with id " + req.params.id
              });
            }
          } else res.send(data);
    });
  
};



// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
    //validate request 
    if (!req.body) {
        res.status(400).send({
            message: "content can not be empty!"
        });
    }
    console.log(req.body);

    Student.updateById(
        req.params.id,
        new Student(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                  res.status(404).send({
                    message: `Not found student with id ${req.params.id}.`
                  });
                } else {
                  res.status(500).send({
                    message: "Error updating student with id " + req.params.id
                  });
                }
              } else res.send(data);
        }
    );
  
};

// Delete a student with the specified id in the request
exports.delete = (req, res) => {
    Student.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `not found student with id ${req.params.id}`
                })
            } else {
                res.status(500).send({
                    message: "Could not delete student with id " + req.params.id
                });
            }
        } else  res.send({ message: `student was deleted successfully!` });
    }); 
};

// Delete all students from the database.
exports.deleteAll = (req, res) => {
    Student.removeAll((err, data) => {
        if (err)
            res.status(500).send({
               message: 
                  err.message || "some error occurred while removing all students"});
        else res.send({ message: `All students were deleted successfully!`});
    });
  
};