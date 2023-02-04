import Badge from 'react-bootstrap/Badge';

function NoTokensMessage() {
  return <div>Use the form above to analyze your text and extract its tokens.</div>;
}

function Badges({ tokens }) {
  return (
    <div className="mt-4 fs-4 font-monospace p-2 border border-2 border-info rounded">
      {tokens.map(({ token, position }) => (
        <Badge className="me-1" bg="info" key={`${token}-${position}`}>
          {token}
        </Badge>
      ))}
    </div>
  );
}

export function TokensList({ tokens }) {
  if (tokens && tokens.length) {
    return <Badges tokens={tokens} />;
  }
  return <NoTokensMessage />;
}
