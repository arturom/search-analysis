import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { WithAnalyzer } from './elements/tabs/WithAnalyzer';
import { WithTokenizer } from './elements/tabs/WithTokenizer';
import { WithField } from './elements/tabs/WithField';
import { Select } from './elements/Select';
import { FormField } from './elements/TextField';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap.min.css';
import './App.css';

function processChangeEvent(e) {
  e.preventDefault();
  e.stopPropagation();
  return e.target.value;
}

function createClientUrlChangedHandler(client, setUrl) {
  return (e) => {
    const newValue = processChangeEvent(e);
    client.url = newValue;
    setUrl(newValue);
  };
}

function walkObject(obj, parentPath, acc) {
  const entries = Object.entries(obj);
  for (const [name, props] of entries) {
    const path = parentPath ? `${parentPath}.${name}` : name;
    if (props.properties !== undefined) {
      walkObject(props.properties, path, acc);
    } else if (props.type === 'text' || props.type === 'keyword') {
      acc.push(path);
      if (props.fields !== undefined) {
        walkObject(props.fields, path, acc);
      }
    }
  }
}

function extractIndexFields({ mappings }) {
  const result = [];
  walkObject(mappings.properties, '', result);
  return result;
}

function extractIndexAnalyzers({ settings }) {
  const analyzers = settings?.index?.analysis?.analyzer;
  return analyzers ? Object.keys(analyzers) : [];
}

function extractIndexTokenizers({ settings }) {
  const tokenizers = settings?.index?.analysis?.tokenizer;
  return tokenizers ? Object.keys(tokenizers) : [];
}

function extractIndexFilters({ settings }) {
  const filters = settings?.index?.analysis?.filter;
  return filters ? Object.keys(filters) : [];
}

function createIndexChangedHandler(client, setIndex, setFields, setAnalyzers, setTokenizers, setFilters) {
  return (e) => {
    const newValue = processChangeEvent(e);
    const promises = [client.getIndexSettings(newValue), client.getIndexMapping(newValue)];
    Promise.all(promises).then(([settings, mappings]) => {
      setFields(extractIndexFields(mappings[newValue]));
      setAnalyzers(extractIndexAnalyzers(settings[newValue]));
      setTokenizers(extractIndexTokenizers(settings[newValue]));
      setFilters(extractIndexFilters(settings[newValue]));
    });
    setIndex(newValue);
  };
}

function App({ client }) {
  const [url, setUrl] = useState(client.url);
  const [indices, setIndices] = useState([]);
  const [index, setIndex] = useState('');
  const [analyzers, setAnalyzers] = useState([]);
  const [tokenizers, setTokenizers] = useState([]);
  const [filters, setFilters] = useState([]);
  const [fields, setFields] = useState([]);
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>&#x1F97C; Text Analysis Lab for Elasticsearch</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="p-4">
        <Form>
          <FormField label="Elasticsearch URL" value={url} onChange={createClientUrlChangedHandler(client, setUrl)} />

          <Select
            label="Index"
            value={index}
            options={indices}
            onChange={createIndexChangedHandler(client, setIndex, setFields, setAnalyzers, setTokenizers, setFilters)}
          >
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                client.getAliases().then((x) => setIndices(Object.keys(x)));
              }}
            >
              Reload List
            </Button>
          </Select>
        </Form>
        <Row className="mt-4">
          <Col>
            <Tabs fill>
              <Tab eventKey="analyzer" title="With Analyzer">
                <WithAnalyzer client={client} index={index} analyzers={analyzers} />
              </Tab>
              <Tab eventKey="field" title="With Field">
                <WithField client={client} index={index} fields={fields} />
              </Tab>
              <Tab eventKey="custom" title="Custom">
                <WithTokenizer client={client} index={index} tokenizers={tokenizers} filters={filters} />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;