import { useState } from 'react';

import Button from 'react-bootstrap/Button';

import { FormField, createHandler } from '../TextField';
import { GroupedSelect } from '../Select';
import { TokensList } from '../TokensList';
import { builtInAnalyzers } from '../../lib/constants';

export function WithAnalyzer({ client, index, analyzers }) {
  const [analyzer, setAnalyzer] = useState('standard');
  const [text, setText] = useState('');
  const [tokens, setTokens] = useState([]);
  return (
    <>
      <GroupedSelect
        label="Analyzer"
        value={analyzer}
        options={builtInAnalyzers}
        secondaryOptions={analyzers}
        onChange={createHandler(setAnalyzer)}
      />
      <FormField label="Text" value={text} onChange={createHandler(setText)} />
      <Button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const body = { text, analyzer };
          client.analyzeWithIndex(index, body).then((res) => setTokens(res.tokens));
        }}
      >
        Analyze
      </Button>
      <TokensList tokens={tokens} />
    </>
  );
}
