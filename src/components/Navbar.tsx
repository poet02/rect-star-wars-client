import React, {  useState } from 'react'
import { cache, searchVar } from '../cache';
import * as getPeople from '../operations/queries/__generated__/GetStarWarsCharacters';//type definition



export const Navbar = () => {
    //use type from generated
    const [data, setData] = useState<getPeople.GetStarWarsCharactersVariables>({
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
        <div className='navbar'>
            <h1>
                <i className='fas fa-code'></i> TapConnector
            </h1>
            <span><input onChange={onchange} type='text' /></span>
            <span><button onClick={searchPeople}> search</button></span>
        </div>
    )
}