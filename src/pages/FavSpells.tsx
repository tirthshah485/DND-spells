import React, { useState, useEffect, useCallback } from "react";
import { getPaginatedFavouriteSpells } from "../services/favouriteSpellService";
import { SpellListItem } from "../components/spell/SpellListItem";
import { PaginationB } from "../components/common/Pagination";
import { useSelector } from "react-redux";
import { selectFavourites } from "../features/spell/spellSlice";
import { ListGroup, ListGroupItem } from "reactstrap";
import { SpellState } from "../types/SpellState";
import { SpellResponse } from "../types/SpellResponse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./FavSpells.css";

// list all the favourites spells with pagination 

export function FavouriteSpells() {
    let favSpells = useSelector(selectFavourites);

    const [spells, setSpells] = useState<SpellState[]>([] as SpellState[]);
    const [totalpages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);

    const pageChangeHandler = (page: number) => {
        setPage(page);
    };
    const updateListHandler = () => {
        toast.info("Spell remove Successfully from favourite", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        setPage(1);
    };

    const loadFavSpells = useCallback(
        () =>
            getPaginatedFavouriteSpells(favSpells, page).then(
                (response: SpellResponse) => {
                    setSpells(response.results);
                    setTotalPages(response.totalPages);
                }
            ),
        [page, favSpells]
    );

    useEffect(() => {
        loadFavSpells();
    }, [page, favSpells, loadFavSpells]);

    if (spells.length === 0) {
        return (
            <div className="main pb-5">
                <h1 className="display-2 text-center pb-3">Dungeons & Dragons Favourite Spells</h1>
                <div className="spell-list">
                    <div
                        data-testid="spell-not-found"
                        className="spell-not-found font-weight-normal text-muted"
                    >
                        No Spell found as favourite.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="main pb-5">
            <h1 className="display-2 text-center pb-3">Dungeons & Dragons Favourite Spells</h1>
            
            <div className="spell-list">
            {totalpages === 1 ? null : (
                    <PaginationB
                        totalPages={totalpages}
                        page={page}
                        onPageChange={pageChangeHandler}
                    />
                )}
                <ListGroup>
                    {spells.map((item: SpellState) => {
                        return (
                            <ListGroupItem>
                                <SpellListItem
                                    key={item.index}
                                    spell={item}
                                    isFavourite={
                                        favSpells.findIndex(
                                            (it: { index: string }) =>
                                                it.index === item.index
                                        ) >= 0
                                    }
                                    updateSpells={updateListHandler}
                                />
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
                
            </div>
            <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ textAlign: "left" }}
        />
        </div>
    );
}
