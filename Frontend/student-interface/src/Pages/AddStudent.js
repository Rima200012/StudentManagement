import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const toast = useRef(null);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.age || formData.age < 1) newErrors.age = "Valid age is required";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.phone || !/^[0-9]{8,15}$/.test(formData.phone)) {
      newErrors.phone = "Valid phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      axios
        .post("http://localhost:3001/api/students", formData)
        .then(() => {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Student Registered Successfully",
          });
          setTimeout(() => navigate("/students"), 2000);
        })
        .catch(() => {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Failed to register student",
          });
        });
    } else {
      toast.current.show({
        severity: "error",
        summary: "Validation Error",
        detail: "Please fill out all required fields correctly",
      });
    }
  };

  return (
    <div className="student-registration" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Toast ref={toast} />
      <Card title="Student Registration" className="p-shadow-4" style={{ maxWidth: "400px", margin: "2rem auto" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {/* Name Field */}
          <div style={{ width: "100%" }}>
            <label htmlFor="name" style={{ display: "block", marginBottom: "0.5rem" }}>
              Name
            </label>
            <InputText
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? "p-invalid" : ""}
              style={{ width: "100%" }}
            />
            {errors.name && <small className="p-error">{errors.name}</small>}
          </div>

          {/* Age Field */}
          <div style={{ width: "100%" }}>
            <label htmlFor="age" style={{ display: "block", marginBottom: "0.5rem" }}>
              Age
            </label>
            <InputText
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleInputChange}
              className={errors.age ? "p-invalid" : ""}
              style={{ width: "100%" }}
            />
            {errors.age && <small className="p-error">{errors.age}</small>}
          </div>

          {/* Email Field */}
          <div style={{ width: "100%" }}>
            <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem" }}>
              Email
            </label>
            <InputText
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? "p-invalid" : ""}
              style={{ width: "100%" }}
            />
            {errors.email && <small className="p-error">{errors.email}</small>}
          </div>

          {/* Phone Field */}
          <div style={{ width: "100%" }}>
            <label htmlFor="phone" style={{ display: "block", marginBottom: "0.5rem" }}>
              Phone
            </label>
            <InputText
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={errors.phone ? "p-invalid" : ""}
              style={{ width: "100%" }}
            />
            {errors.phone && <small className="p-error">{errors.phone}</small>}
          </div>

          {/* Submit Button */}
          <Button label="Register" icon="pi pi-check" className="p-button-success" type="submit" />
        </form>
      </Card>
    </div>
  );
};

export default StudentRegistration;
