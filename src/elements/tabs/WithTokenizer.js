import { useState } from 'react';

import Button from 'react-bootstrap/Button';

import { FormField, createHandler } from '../TextField';
import { GroupedSelect, createMultiSelectHandler } from '../Select';
import { TokensList } from '../TokensList';
import { builtInFilters, builtInTokenizers } from '../../lib/constants';

export function WithTokenizer({ client, index, tokenizers, filters, onError }) {
  const [tokenizer, setTokenizer] = useState('standard');
  const [filter, setFilter] = useState([]);
  const [text, setText] = useState('');
  const [tokens, setTokens] = useState([]);
  return (
    <div className="pt-4">
      <GroupedSelect
        label="Tokenizer"
        labelPlural="Tokenizers"
        value={tokenizer}
        options={builtInTokenizers}
        secondaryOptions={tokenizers}
        onChange={createHandler(setTokenizer)}
      />
      <GroupedSelect
        label="Filter"
        labelPlural="Filters"
        options={builtInFilters}
        secondaryOptions={filters}
        onChange={createMultiSelectHandler(setFilter)}
        multiple
        htmlSize="10"
      />
      <FormField label="Text" as="textarea" value={text} onChange={createHandler(setText)} />
      <Button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const body = { text, tokenizer, filter };
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
