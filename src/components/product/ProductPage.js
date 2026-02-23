import { useEffect, useState } from 'react';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import { Container } from 'react-bootstrap';
import FeedbackAlert from '../FeedbackAlert';

function ProductPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const loadData = () => {
    fetch('http://localhost:8080/api/products')
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw (err.errors) 
              ? { errors: err.errors }
              : { errors: ['Erro ao carregar dados'] };
          });
        }
        return response.json();
      })
      .then(json => Array.isArray(json) ? setData(json): setData([]))
      .catch(err => {
        setError(err.errors);
        setData([]);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleAdd = (newItem) => {
    setData(prev => [...prev, newItem]);
  };

  const handleRemove = (id) => {
    fetch(`http://localhost:8080/api/products/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw (err.errors) 
              ? { errors: err.errors }
              : { errors: ['Erro ao carregar dados'] };
          });
        }
        setSuccess('Registro removido com sucesso');
        loadData();
      })
      .catch(err => setError([err.errors]));
  };

  return (
    <>
      <FeedbackAlert error={error} success={success}></FeedbackAlert>
      <Container className="mt-5">
        <h2 className="mb-4">Produto</h2>
        <div className="mb-4">
          <ProductForm onAdd={handleAdd} setError={setError} setSuccess={setSuccess} />
        </div>
        <ProductTable data={data} onRemove={handleRemove} />
      </Container>
    </>
  );
}

export default ProductPage;
