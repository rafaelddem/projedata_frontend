import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { formatCurrency } from '../../formatter/money';

function ProductTable({ data, onRemove }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Valor</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{formatCurrency(item.value)}</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                title="Remover registro"
                onClick={() => onRemove(item.id)}
              >
                <i className="bi bi-trash"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ProductTable;
