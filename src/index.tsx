import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { cache } from './cache';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache:cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

