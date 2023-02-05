import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export function Select({ label, value, options, onChange, multiple, children }) {
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="3">
        {label}
      </Form.Label>
      <Col>
        <InputGroup>
          {children}
          <Form.Select type="text" value={value} onChange={onChange} multiple={multiple}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
      </Col>
    </Form.Group>
  );
}

export function GroupedSelect({ label, value, options, secondaryOptions, onChange, multiple, htmlSize, children }) {
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="3">
        {label}
      </Form.Label>
      <Col>
        <InputGroup>
          {children}
          <Form.Select type="text" value={value} onChange={onChange} multiple={multiple} htmlSize={htmlSize}>
            <optgroup label={`Built-in ${label}s`}>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </optgroup>
            <optgroup label={`Index ${label}s`}>
              {secondaryOptions &&
                secondaryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </optgroup>
          </Form.Select>
        </InputGroup>
      </Col>
    </Form.Group>
  );
}

export function createMultiSelectHandler(setter) {
  return (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newValue = Array.prototype.map.call(e.target.selectedOptions, (x) => x.value);
    setter(newValue);
  };
}
