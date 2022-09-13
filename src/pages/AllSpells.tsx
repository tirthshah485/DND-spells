import React, { useState, useEffect, useCallback } from "react";
import getPagedSpells from "../services/paginatedSpellService";
import { SpellListItem } from "../components/spell/SpellListItem";
import { PaginationB } from "../components/common/Pagination";
import { useSelector } from "react-redux";
import { selectFavourites } from "../features/spell/spellSlice";
import { Spinner, ListGroup, ListGroupItem } from "reactstrap";
import { SpellState } from "../types/SpellState";
import { SpellResponse } from "../types/SpellResponse";
import Button from 'react-bootstrap/Button';
import "./AllSpells.css";

// Listed all the spells with pagination 

export function AllSpells() {

    const favSpells = useSelector(selectFavourites);

    const [spells, setSpells] = useState<SpellState[] | null>(null);
    const [totalpages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);

    const pageChangeHandler = (page: number) => {
        setSpells(null);
        setPage(page);
    };

    const loadSpells = useCallback(
        () =>
            getPagedSpells(page).then((response: SpellResponse) => {
                setSpells(response.results);
                setTotalPages(response.totalPages);
                
            }),
        [page]
    );

    useEffect(() => {
        console.log(spells)
        loadSpells();
       
    }, [page, loadSpells]);

    if (spells == null) {
        return (
            <div className="main pb-5">
                <h1 className="display-2 text-center pb-3">All Spells</h1>
                <div className="spell-list px-5 py-2 d-flex justify-content-center">
                    <Button className="text-center"
                        color="primary"
                        disabled
                    >
                        <Spinner size="sm">
                            Loading...
                        </Spinner>
                        <span>
                            {' '}Loading...
                        </span>
                    </Button>

                </div>
            </div>
        );
    }

    if (spells.length === 0) {
        return (
            <div className="main pb-5">
                <h1 className="display-2 text-center pb-3">All Spells</h1>
                <div className="spell-list">
                    <div className="spell-not-found">
                        No Spell found as favourite.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="main pb-5">
            <h1 className="display-2 text-center pb-3">Dungeons & Dragons Spells </h1>
            <div className="spell-list">
                <PaginationB
                    totalPages={totalpages}
                    page={page}
                    onPageChange={pageChangeHandler}
                />
                 
                <ListGroup className="bg-dark">
                
                    {spells.map((item) => {
                        return (
                            <ListGroupItem key={item.index} color="dark">
                                <SpellListItem
                                    key={item.index}
                                    spell={item}
                                    isFavourite={
                                        favSpells.findIndex(
                                            (it: { index: string }) =>
                                                it.index === item.index
                                        ) >= 0
                                    }
                                />
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>

               
            </div>
        </div>
    );
}
