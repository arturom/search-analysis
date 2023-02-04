import { useState } from 'react';

import Button from 'react-bootstrap/Button';

import { FormField, createHandler } from '../TextField';
import { Select } from '../Select';
import { TokensList } from '../TokensList';

export function WithField({ client, index, fields }) {
  const [field, setField] = useState('');
  const [text, setText] = useState('');
  const [tokens, setTokens] = useState([]);
  return (
    <>
      <Select label="Field" value={field} options={fields} onChange={createHandler(setField)} />
      <FormField label="Text" value={text} onChange={createHandler(setText)} />
      <Button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const body = { text, field };
          client.analyzeWithIndex(index, body).then((res) => setTokens(res.tokens));
        }}
      >
        Analyze
      </Button>
      <TokensList tokens={tokens} />
    </>
  );
}
