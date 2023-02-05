import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export function FormField({ label, value, onChange, as }) {
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="3">
        {label}
      </Form.Label>
      <Col>
        <Form.Control type="text" as={as} value={value} onChange={onChange} />
      </Col>
    </Form.Group>
  );
}

export function createHandler(setter) {
  return (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newValue = e.target.value;
    setter(newValue);
  };
}
