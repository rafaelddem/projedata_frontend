import Table from 'react-bootstrap/Table';
import { formatCurrency } from '../../formatter/money';

function SupplyTable({ data, onRemove }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Valor</th>
          <th>Disponibilidade</th>
          <th>Lucro Total</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{formatCurrency(item.value)}</td>
            <td>{item.maxProduction}</td>
            <td>{formatCurrency(item.maxValue)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default SupplyTable;
