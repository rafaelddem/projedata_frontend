import { useEffect, useState } from 'react';
import SupplyTable from './SupplyTable';
import { Container } from 'react-bootstrap';

function SupplyPage() {
  const [data, setData] = useState([]);

  const loadData = () => {
    fetch('http://localhost:8080/api/supply')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(err => console.error('Erro ao buscar dados:', err));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Produto por Lucro e Disponibilidade</h2>
      <SupplyTable data={data} />
    </Container>
  );
}

export default SupplyPage;
