import { useState } from 'react';

import Button from 'react-bootstrap/Button';

import { FormField, createHandler } from '../TextField';
import { GroupedSelect, createMultiSelectHandler } from '../Select';
import { TokensList } from '../TokensList';
import { builtInFilters, builtInTokenizers } from '../../lib/constants';

export function WithTokenizer({ client, index, tokenizers, filters }) {
  const [tokenizer, setTokenizer] = useState('standard');
  const [filter, setFilter] = useState([]);
  const [text, setText] = useState('');
  const [tokens, setTokens] = useState([]);
  return (
    <>
      <GroupedSelect
        label="Tokenizer"
        value={tokenizer}
        options={builtInTokenizers}
        secondaryOptions={tokenizers}
        onChange={createHandler(setTokenizer)}
      />
      <GroupedSelect
        label="Filters"
        options={builtInFilters}
        secondaryOptions={filters}
        onChange={createMultiSelectHandler(setFilter)}
        multiple
      />
      <FormField label="Text" value={text} onChange={createHandler(setText)} />
      <Button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const body = { text, tokenizer, filter };
          client.analyzeWithIndex(index, body).then((res) => setTokens(res.tokens));
        }}
      >
        Analyze
      </Button>
      <TokensList tokens={tokens} />
    </>
  );
}
