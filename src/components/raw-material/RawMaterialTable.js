import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function RawMaterialTable({ data, onRemove }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Quantidade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onRemove(item.id)}
              >
                Remover
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default RawMaterialTable;
