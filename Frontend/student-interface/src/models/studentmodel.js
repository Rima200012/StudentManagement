// src/models/studentModel.js
class StudentModel {
    constructor({
      name = "",
      email = "",
      phone = "",
      password = "",
      gender = "",
      studentClass = "",
      age = "",
    }) {
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.password = password;
      this.gender = gender;
      this.studentClass = studentClass;
      this.age = age;
    }
  }
  
  export default StudentModel;
  