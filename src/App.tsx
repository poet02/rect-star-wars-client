import React, { Fragment }  from 'react';
import './App.css';
import { useQuery } from '@apollo/client';
import * as getPeople  from './operations/queries/__generated__/StarWarsCharacters';//type definition
import { GET_STAR_WARS_CHARACTERS } from './operations/queries/getStarWarsCharacters'; //query or action

function Home() {
 
  const { data, loading, error } = useQuery<getPeople.StarWarsCharacters, getPeople.StarWarsCharactersVariables>
    (GET_STAR_WARS_CHARACTERS, {
      variables: {
        search: 'l',
        page: 1
      }
    });
  if (loading || !data?.getPeople?.results) return <div>loading...</div>;
  return (

        <Fragment>
          {data.getPeople.results.map((p) => (
            <p key={p?.name}> {p?.name}</p>
          ))}
        </Fragment>
  );

}
function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
