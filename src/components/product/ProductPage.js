import { useEffect, useState } from 'react';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import { Container } from 'react-bootstrap';

function ProductPage() {
  const [data, setData] = useState([]);

  const loadData = () => {
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(err => console.error('Erro ao buscar dados:', err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = (newItem) => {
    setData(prev => [...prev, newItem]);
  };

  const handleRemove = (id) => {
    fetch(`http://localhost:8080/api/products/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        loadData();
      })
      .catch(err => console.error('Erro ao remover:', err));
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Produto</h2>
      <div className="mb-4">
        <ProductForm onAdd={handleAdd} />
      </div>
      <ProductTable data={data} onRemove={handleRemove} />
    </Container>
  );
}

export default ProductPage;
