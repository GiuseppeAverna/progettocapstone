import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error("Hai già effettuato l'accesso con questa email.");
          }
          throw new Error("Credenziali non valide!");
        }
        return response.text();
      })
      .then((data) => {
        const { accessToken } = JSON.parse(data);
        localStorage.setItem("accessToken", accessToken);
        navigate("/home");
      })
      .catch((error) => {
        console.error(
          "Si è verificato un errore durante il login:",
          error.message
        );
        alert(error.message);
      });
  };

  return (
    <>
      <div className="page-content homepage">
        <div className="login-page">
          <div className="login-form ">
            <h2>Accedi</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  className="form-field"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  className="form-field"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <div className="button-group">
                <Button variant="primary" type="submit">
                  Accedi
                </Button>
              </div>
              <div>
                <Link to={`/register`}>Non hai un account? Registrati</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
