import { useEffect, useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client';
import { totalPeopleVar, showingPeopleVar, searchVar, resetPageVar } from '../cache';
import * as getPeople from '../operations/queries/__generated__/StarWarsCharacters';//type definition
import { GET_STAR_WARS_CHARACTERS } from '../operations/queries/getStarWarsCharacters'; //query or action
import { Spinner, Button, Modal } from 'react-bootstrap'

export const Landing = () => {
    const { data, loading, error, fetchMore
    } = useQuery<getPeople.StarWarsCharacters, getPeople.StarWarsCharactersVariables>
            (GET_STAR_WARS_CHARACTERS, {
                variables: {
                    search: useReactiveVar(searchVar),
                    page: 1
                }
            })

        ;
    useEffect(() => {
        //This ensures that navbar does not update before landing
        totalPeopleVar(data?.getPeople?.count as number);
        showingPeopleVar(data?.getPeople?.results?.length);
    });//add [] as param to runn once

    const [isLoadingMore, setIsLoadingMore] = useState(false);
   
    const [page, setPage] = useState(1);
    const resetPage =  useReactiveVar(resetPageVar);
    if (resetPage) {        
        resetPageVar(false);
        setPage(1);
    }
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [personData, setPersonData] = useState<getPeople.StarWarsCharacters_getPeople_results>({
        __typename: "Person",
        name: "",
        height: "",
        mass: "",
        homeWorld: "",
        gender: "",

    });

    

    const handleShow = (p: getPeople.StarWarsCharacters_getPeople_results) => {
        setPersonData({
            ...p,
            name: p.name,
            height: p.height,
            mass: p.mass,
            gender: p.gender ? p.gender : 'unknown',
            homeWorld: p.homeWorld ? p.homeWorld : "unknown",

        });
        setShow(true);
    };

    if (loading || !data?.getPeople?.results) {

        return <div className='spinner-container'>
            <Spinner animation="border" />;
        </div>
    } if (!loading && !data?.getPeople?.count) {
        return  <div> No results could be found</div>
    }
    if (error) {
        setIsLoadingMore(false);
        return <p>ERROR</p>;
    }
    
    return (
        <>
            <ul className="list-group">
                {data.getPeople.results.map((p: any) => (
                    <li key={p.name} className="list-item list-group-item"
                        onClick={() => {
                            handleShow(p)
                        }}
                    >{p.name}</li>
                ))}
            </ul>
            <Button variant="primary"
                disabled={isLoadingMore}
                hidden={data?.getPeople?.results.length === data?.getPeople?.count}
                onClick={async () => {
                    const pageNum = page + 1;
                    console.log('pageIn',pageNum)
                    setPage(pageNum);
                    setIsLoadingMore(true);
                    await fetchMore({
                        variables: { page: pageNum},
                    })
                    setIsLoadingMore(false);
                }
                }>
                {data.getPeople.results && (
                    isLoadingMore ?
                        <Spinner animation="border" />
                        : 'Load More'
                )}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>More Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{"Name: "}{personData.name}</p>
                    <p>{"Height: "}{personData.height}{" cm"}</p>
                    <p>{"Mass: "}{personData.mass}{" kgs"}</p>
                    <p>{"Gender: "}{personData.gender}</p>
                    <p>{"Home World: "}{personData.homeWorld}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
