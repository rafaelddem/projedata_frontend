import { useEffect, useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { formatCurrency } from '../../formatter/money';

function ProductForm({ onAdd, setError, setSuccess }) {
  const [name, setName] = useState('');
  const [rawValue, setRawValue] = useState(null);
  const [displayValue, setDisplayValue] = useState('');
  const [supplies, setSupplies] = useState([]);
  const [options, setOptions] = useState([]);

  const handleValueChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    const numericValue = parseInt(input, 10);

    if (!isNaN(numericValue)) {
      setRawValue(numericValue);
      setDisplayValue(formatCurrency(numericValue));
    } else {
      setRawValue(null);
      setDisplayValue('');
    }
  };

  const addSupplyFields = () => {
    setSupplies([...supplies, { raw_material: '', quantity: '' }]);
  };

  const removeSupplyFields = (index) => {
    const updated = supplies.filter((_, i) => i !== index);
    setSupplies(updated);
  };

  const updateSupplies = (index, field, newValue) => {
    const updated = [...supplies];
    updated[index][field] = newValue;
    setSupplies(updated);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const newMaterial = {
      name: name, 
      value: rawValue, 
      raw_materials: supplies.map(supply => ({
        raw_material_id: supply.raw_material,
        quantity: supply.quantity,
      }))
    };

    fetch('http://localhost:8080/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMaterial),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw (err.errors) 
              ? { errors: err.errors }
              : { errors: ['Erro ao salvar'] };
          });
        }
        return response.json();
      })
      .then(data => {
        onAdd(data);
        setName('');
        setRawValue(null);
        setDisplayValue('');
        setSupplies([]);
        setSuccess('Cadastro realizado com sucesso!');
      })
      .catch(err => {
        setError(err.errors);
      });
    };

    useEffect(() => {
      fetch('http://localhost:8080/api/raw_materials')
        .then(res => res.json())
        .then(data => setOptions(data))
        .catch(err => console.error('Erro ao carregar opções:', err));
    }, []);

  return (
    <>
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
            <Form.Group className="mb-3" controlId="formValue">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o valor"
                value={displayValue}
                onChange={handleValueChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {supplies.length > 0 && (
          <Row className="justify-content-center mb-2">
            <Col md={6}>
              <Form.Label>Matérias-primas</Form.Label>
            </Col>
          </Row>
        )}

        {supplies.map((supply, index) => (
          <Row className="justify-content-center mb-3" key={index}>
            <Col xs={12} md={3} className="mb-2">
              <Form.Select
                value={supply.raw_material}
                onChange={(e) => updateSupplies(index, 'raw_material', e.target.value)}
              >
                <option value="">Selecione...</option>
                {options.map(raw_material => (
                  <option key={raw_material.id} value={raw_material.id}>
                    {raw_material.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={8} md={2} className="mb-2">
              <Form.Control
                type="number"
                placeholder="Quantidade"
                value={supply.quantity}
                onChange={(e) => updateSupplies(index, 'quantity', e.target.value)}
              />
            </Col>
            <Col xs={4} md={1} className="mb-2">
              <Button
                type="button"
                variant="danger"
                className='w-100'
                title="Remover matéria-prima"
                onClick={() => removeSupplyFields(index)}
              >
                <i className="bi bi-trash"></i>
              </Button>
            </Col>
          </Row>
        ))}

        <Button type="button" variant="info" className="me-2" onClick={addSupplyFields}>
          Adicionar Matéria-prima
        </Button>

        <Button type="submit" variant="success">
          Salvar
        </Button>
      </Form>
    </>
  );
}

export default ProductForm;
