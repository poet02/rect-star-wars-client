import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider, ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { cache } from './cache';
import 'bootstrap/dist/css/bootstrap.min.css';


const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: ' https://whispering-oasis-61957.herokuapp.com/graphql',
  cache: cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

