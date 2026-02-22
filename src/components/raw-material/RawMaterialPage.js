import { useEffect, useState } from 'react';
import RawMaterialForm from './RawMaterialForm';
import RawMaterialTable from './RawMaterialTable';
import { Container } from 'react-bootstrap';

function RawMaterialPage() {
  const [data, setData] = useState([]);

  const loadData = () => {
    fetch('http://localhost:8080/api/raw_materials')
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
    fetch(`http://localhost:8080/api/raw_materials/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        loadData();
      })
      .catch(err => console.error('Erro ao remover:', err));
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Matéria-prima</h2>
      <div className="mb-4">
        <RawMaterialForm onAdd={handleAdd} />
      </div>
      <RawMaterialTable data={data} onRemove={handleRemove} />
    </Container>
  );
}

export default RawMaterialPage;
