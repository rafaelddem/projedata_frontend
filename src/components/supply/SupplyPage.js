import { useEffect, useState } from 'react';
import SupplyTable from './SupplyTable';
import { Container } from 'react-bootstrap';
import FeedbackAlert from '../FeedbackAlert';

function SupplyPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const loadData = () => {
    fetch('http://localhost:8080/api/supply')
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || 'Erro ao carregar dados');
          });
        }
        return response.json();
      })
      .then(json => Array.isArray(json) ? setData(json): setData([]))
      .catch(err => {
        setError(err.message);
        setData([]);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <FeedbackAlert error={error}></FeedbackAlert>
      <Container className="mt-5">
        <h2 className="mb-4">Produto por Lucro e Disponibilidade</h2>
        <SupplyTable data={data} />
      </Container>
    </>
  );
}

export default SupplyPage;
