import React, { Fragment, useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client';
import { searchVar, cache } from '../cache';
import * as getPeople from '../operations/queries/__generated__/StarWarsCharacters';//type definition
import { GET_STAR_WARS_CHARACTERS } from '../operations/queries/getStarWarsCharacters'; //query or action

export const Landing = () => {

    const { data, loading, error, fetchMore
    } = useQuery<getPeople.StarWarsCharacters, getPeople.StarWarsCharactersVariables>
            (GET_STAR_WARS_CHARACTERS, {
                variables: {
                    search: useReactiveVar(searchVar),
                    page: 1
                }

            });


    const [isLoadingMore, setIsLoadingMore] = useState(false);
    if (isLoadingMore || loading || !data?.getPeople?.results) return <div>loading...</div>;

    return (
        <Fragment>
            <ul className="list-group">
                {data.getPeople.results.map((p: any) => (
                    <li key={p.name} className="list-group-item">{p.name}</li>
                ))}
            </ul>
            <button
                onClick={() => {
                    const endCursor = 2;
                    fetchMore({
                        variables: { page: 2 },
                    })
                }
                }>Load More</button>
        </Fragment>
    )
}
