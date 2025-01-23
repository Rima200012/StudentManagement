import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { InputText, InputNumber, Dropdown, Button, Message } from "primereact";
import StudentModel from "../models/studentmodel"; // Use StudentModel instead of UserModel

const SignUp = () => {
  const [formValues, setFormValues] = useState(new StudentModel({})); // Initialize with StudentModel
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formValues.name) {
      errors.name = "Name is required";
    }
    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formValues.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formValues.phone)) {
      errors.phone = "Phone number should be 10 digits";
    }
    if (!formValues.password) {
      errors.password = "Password is required";
    }
    if (!formValues.gender) {
      errors.gender = "Gender is required";
    }
    if (!formValues.studentClass) {
      errors.studentClass = "Student class is required";
    }
    if (!formValues.age) {
      errors.age = "Age is required";
    } else if (isNaN(formValues.age) || formValues.age < 18 || formValues.age > 100) {
      errors.age = "Please enter a valid age between 18 and 100";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("http://localhost:3000/api/auth/register", formValues);
        if (response.data.success) {
          toast.success(response.data.message || "Registration successful!");
          setFormValues(new StudentModel({})); // Reset form with an empty StudentModel
          setFormErrors({});
        } else {
          toast.error(response.data.message || "Registration failed!");
        }
      } catch (error) {
        toast.error(error.response.data.message || "Something went wrong. Please try again later.");
      }
    } else {
      setFormErrors(errors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="sign-up-container" style={{ maxWidth: '400px', margin: 'auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            className={formErrors.name ? 'p-invalid' : ''}
            style={{ width: '100%' }}
          />
          {formErrors.name && <Message severity="error" text={formErrors.name} />}
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className={formErrors.email ? 'p-invalid' : ''}
            style={{ width: '100%' }}
          />
          {formErrors.email && <Message severity="error" text={formErrors.email} />}
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="phone">Phone No</label>
          <InputText
            id="phone"
            name="phone"
            type="tel"
            value={formValues.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            className={formErrors.phone ? 'p-invalid' : ''}
            style={{ width: '100%' }}
          />
          {formErrors.phone && <Message severity="error" text={formErrors.phone} />}
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Password</label>
          <InputText
            id="password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className={formErrors.password ? 'p-invalid' : ''}
            style={{ width: '100%' }}
          />
          {formErrors.password && <Message severity="error" text={formErrors.password} />}
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="gender">Gender</label>
          <Dropdown
            id="gender"
            name="gender"
            value={formValues.gender}
            options={[{ label: "Select Gender", value: "" }, { label: "Male", value: "male" }, { label: "Female", value: "female" }]}
            onChange={handleInputChange}
            className={formErrors.gender ? 'p-invalid' : ''}
            style={{ width: '100%' }}
          />
          {formErrors.gender && <Message severity="error" text={formErrors.gender} />}
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="studentClass">Student Class</label>
          <InputText
            id="studentClass"
            name="studentClass"
            value={formValues.studentClass}
            onChange={handleInputChange}
            placeholder="Enter your student class"
            className={formErrors.studentClass ? 'p-invalid' : ''}
            style={{ width: '100%' }}
          />
          {formErrors.studentClass && <Message severity="error" text={formErrors.studentClass} />}
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label htmlFor="age">Age</label>
          <InputNumber
            id="age"
            name="age"
            value={formValues.age}
            onValueChange={(e) => handleInputChange({ target: { name: "age", value: e.value } })}
            placeholder="Enter your age"
            className={formErrors.age ? 'p-invalid' : ''}
            style={{ width: '100%' }}
          />
          {formErrors.age && <Message severity="error" text={formErrors.age} />}
        </div>

        <Button type="submit" label="Sign Up" className="p-button-primary p-mt-3" style={{ width: '100%' }} />
      </form>

      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Already have an account?{" "}
        <Link to="/login" className="toggle-link" style={{ color: "#007BFF", textDecoration: "underline" }}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
