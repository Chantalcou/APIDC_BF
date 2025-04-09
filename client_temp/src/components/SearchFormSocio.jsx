// SearchFormSocio.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifySocio } from "../redux/actions/index";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import Swal from "sweetalert2";

const SearchFormSocio = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSocioVerified, socioData, isSocio } = useSelector((state) => state);

  const [formData, setFormData] = useState({
    from_email: "",
    id_socio: "",
  });

  const [status, setStatus] = useState("");
  const [statusVariant, setStatusVariant] = useState("success");
  const [errors, setErrors] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.from_email || !formData.id_socio) {
      setStatus("Por favor, completa todos los campos.");
      setStatusVariant("danger");
      return;
    }

    setStatus("Verificando...");
    setStatusVariant("info");

    try {
      await dispatch(verifySocio(formData.from_email, formData.id_socio));
      // El useEffect manejará el éxito
    } catch (error) {
      setStatus("Error al verificar el socio.");
      setStatusVariant("danger");
    }
  };


  return (
    <div className="full-height">
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-center mb-4">Formulario del Socio</h2>
            {status && (
              <Alert variant={statusVariant} className="text-center">
                {status}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  required
                  placeholder="Email..."
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Número de socio</Form.Label>
                <Form.Control
                  type="text"
                  name="id_socio"
                  value={formData.id_socio}
                  onChange={handleChange}
                  required
                  placeholder="Número de socio..."
                />
              </Form.Group>

              {errors && (
                <Alert variant="danger" className="text-center">
                  Por favor, completa todos los campos.
                </Alert>
              )}

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Verificar Socio
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchFormSocio;
