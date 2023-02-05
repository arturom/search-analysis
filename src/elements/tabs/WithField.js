import { useState } from 'react';

import Button from 'react-bootstrap/Button';

import { FormField, createHandler } from '../TextField';
import { Select } from '../Select';
import { TokensList } from '../TokensList';

export function WithField({ client, index, fields, onError }) {
  const [field, setField] = useState('');
  const [text, setText] = useState('');
  const [tokens, setTokens] = useState([]);
  return (
    <div className="pt-4">
      <Select label="Field" value={field} options={fields} onChange={createHandler(setField)} />
      <FormField label="Text" as="textarea" value={text} onChange={createHandler(setText)} />
      <Button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const body = { text, field };
          client
            .analyzeWithIndex(index, body)
            .then((res) => setTokens(res.tokens))
            .catch(onError);
        }}
      >
        Analyze Text
      </Button>
      <TokensList tokens={tokens} />
    </div>
  );
}
