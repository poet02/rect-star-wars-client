import React, { useState } from 'react'
import { totalPeopleVar, showingPeopleVar, cache, searchVar } from '../cache';
import { useReactiveVar } from '@apollo/client';

import * as getPeople from '../operations/queries/__generated__/StarWarsCharacters';//type definition
import { Button } from 'react-bootstrap'



export const Navbar = () => {
    //use type from generated
    const [data, setData] = useState<getPeople.StarWarsCharactersVariables>({
        search: "",
    });
    // const showing = useReactiveVar(showingPeopleVar);
    // const total = useReactiveVar(totalPeopleVar);
    // let resString = 'result';
    // if (total > 1) {
    //     resString += 's';
    // } 

    function searchPeople(e: any) {
        e.preventDefault();
        cache.evict({ fieldName: 'getPeople' });
        cache.gc();
        searchVar(data.search as string)
    }
    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const search = (event.target as HTMLInputElement).value;
        setData({ search });
    }
    
    return (
        <div className='navbar' style={{ position: 'sticky' }}>
            <h1>
                <i className='fas fa-code'></i> Star Wars Peeps
            </h1>
            <span>
                <form>
                    <input className="input-field" placeholder='search for characters' onChange={onChange} type='text'
                        style={{ marginRight: '12px' }}>
                    </input>
                    <Button type='submit' onClick={searchPeople}> search</Button>
                </form>
            </span>
            {/* <div hidden={!showing}>
                {'showing '} {showing}{' of '}{total}{' '} {resString}
            </div> */}
        </div>
    )
}