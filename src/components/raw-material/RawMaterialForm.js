import { useEffect, useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function RawMaterialForm({ onAdd }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const newMaterial = { name: name, quantity: quantity };

    fetch('http://localhost:8080/api/raw_materials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMaterial),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || 'Erro ao salvar');
          });
        }
        return response.json();
      })
      .then(data => {
        onAdd(data);
        setName('');
        setQuantity('');
        setSuccess('Cadastro realizado com sucesso!');
      })
      .catch(err => {
        setError(err.message);
      });
    };

    useEffect(() => {
      if (error || success) {
        const timer = setTimeout(() => {
          setError(null);
          setSuccess(null);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [error, success]);

  return (
    <>
      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mb-3">
          {success}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="formQuantity">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="number"
                placeholder="Digite a quantidade"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </Form>
    </>
  );
}

export default RawMaterialForm;
