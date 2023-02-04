import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const builtInTokenizers = ['standard', 'letter', 'lowercase', 'whitespace', 'uax_url_email', 'classic', 'thai'];

function Ngram() {}

function TokenConfigSelector({ label, onChange }) {
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="3">
        {label}
      </Form.Label>
      <Col>
        <Form.Select type="text" onChange={onChange}>
          <optgroup label={`Built-in Tokenizers`}>
            {builtInTokenizers.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </optgroup>
        </Form.Select>
      </Col>
    </Form.Group>
  );
}
