# Search analyzer

## A graphical user interface for the Elasticsearch Analyze API

Try it out at https://arturom.github.io/search-analysis

It is useful to test built-in analyzers as well as custom analyzers. It can be used to formulate new custom analyzers combining tokenizers and filters.

## Features

- Analyze text using built-in analyzers
- Analyze text using a custom index analyzer
- Analyze text by using an existing field's analyzer
- Analyze text using from an existing tokenizer and one or more existing filters (built-in or added to the index settings)

## Roadmap

- Allow users to provide Tokenizer parameters and Filter Parameters

## Elasticsearch Configuration

This tool needs to have http access to an Elasticsearch node. Elasticsearch security configuration needs to be relaxed to allow cross-domain requests and to allow non-https requests.

Below are the most-permisive `elasticsearch.yaml` settings. Do not use these values in a production cluster.

Disabling ssl might not necessary if you don't intend to clone, build, and host this repo locally.

```
xpack.security.http.ssl:
  enabled: false

http.host: 0.0.0.0
http.cors.enabled: true
http.cors.allow-origin: '*'
```

## Development

The app was initialized with Create React App.
It is deployed to Github Pages using the gh-pages package.
