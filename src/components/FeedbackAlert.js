import { Alert } from 'react-bootstrap';

function FeedbackAlert({ error, success }) {
  if (!error && !success) return null;

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
    </>
  );
}

export default FeedbackAlert;
