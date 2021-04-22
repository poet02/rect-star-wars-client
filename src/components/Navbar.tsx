import React, {  useState } from 'react'
import { cache, searchVar } from '../cache';
import * as getPeople from '../operations/queries/__generated__/StarWarsCharacters';//type definition
import {  Button } from 'react-bootstrap'



export const Navbar = () => {
    //use type from generated
    const [data, setData] = useState<getPeople.StarWarsCharactersVariables>({
        search: "",
    });

    function searchPeople() {
        cache.evict({ fieldName: 'getPeople' });
        cache.gc();
        searchVar(data.search as string)
    }
    function onchange(event: React.ChangeEvent<HTMLInputElement>) {
        const search = (event.target as HTMLInputElement).value;
        setData({ search });
    }
    return (
        <div className='navbar' style={{position: 'sticky'}}>
            <h1>
                <i className='fas fa-code'></i> Star Wars Characters
            </h1>
            <span>
                <input className="input-field" placeholder='search for characters' onChange={onchange} type='text' 
                    style={{marginRight: '12px'}}>
                </input>
                <Button onClick={searchPeople}> search</Button>
            </span>
        </div>
    )
}