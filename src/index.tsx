import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { cache } from './cache';
import 'bootstrap/dist/css/bootstrap.min.css';


const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache:cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </ApolloProvider>,
  document.getElementById('root')
);

