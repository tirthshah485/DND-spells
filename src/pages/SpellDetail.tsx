import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import getSpellDetails from "../services/spellDetailService";
import { Spinner, Button } from "reactstrap";
import { SpellDetailState } from "../types/SpellDetailState";
import { useDispatch, useSelector } from "react-redux";
import { selectFavourites } from "../features/spell/spellSlice";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from "react-bootstrap-icons";
import {
    addToFavourite,
    removeFromfavourite,
} from "../features/spell/spellSlice";

import "./SpellDetail.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// list all required information for specific spell 

export function SpellInfo() {
    let { index } = useParams();
    const navigate = useNavigate();
    const home = () => {
        navigate('/');
    }

    const [spellDetails, setSpellDetails] = useState<SpellDetailState | null>(
        {} as SpellDetailState
    );


    const favSpells = useSelector(selectFavourites);
    const dispatch = useDispatch();

    let isFavourite = () => {
        if (spellDetails)
            return (
                favSpells.findIndex(
                    (it: { index: string }) => it.index === spellDetails.index
                ) >= 0
            );
        else return false;
    };

    const bookMarkHandler = () => {
        if (isFavourite() && spellDetails) {
            dispatch(removeFromfavourite(spellDetails.index));
            toast.info("Spell removed Successfully from favourite", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            if (spellDetails) {
                toast.info("Spell added Successfully in favourite", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                dispatch(addToFavourite(spellDetails));
            }
        }
    };

    const loadSpellInfo = useCallback(
        () =>
            getSpellDetails(index).then((response) => {
                if (!response.error) {
                    setSpellDetails(response);
                } else {
                    setSpellDetails(null);
                }
            }),
        [index]
    );

    useEffect(() => {
        loadSpellInfo();
    }, [index, loadSpellInfo]);

    if (!spellDetails) {
        return (
            <div className="main">
                <div className="spell-detail">
                    <div
                        data-testid="spell-detail-not-found"
                        className="spell-detail-not-found"
                    >
                        Spell Not Found!
                    </div>
                </div>
            </div>
        );
    }

    if (spellDetails && !spellDetails.name) {
        return (
            <div className="main">
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

    return (
        <div className="main">
            <div className="spell-detail m-auto" data-testid="spell-info">
                <div className="spell-heading d-flex flex-column flex-md-row align-items-center justify-content-evenly">
                    <div className="add-to-fav">

                        <Button
                            style={{ width: "200px" }}
                            onClick={home}
                        >
                            <ArrowLeft color="primary" style={{ marginRight: "20px" }} size={25}></ArrowLeft>
                            Back to Home
                        </Button>

                    </div>
                    <div className="spell-header display-1 p-3 d-flex ">
                        {spellDetails.name}
                    </div>
                    <div className="add-to-fav">
                        {isFavourite() ? (
                            <Button
                                style={{ width: "200px" }}
                                onClick={bookMarkHandler}
                            >
                                Remove from favourite
                            </Button>
                        ) : (
                            <Button
                                color="secondary"
                                style={{ width: "200px" }}
                                onClick={bookMarkHandler}
                            >
                                Add to favourites
                            </Button>
                        )}
                    </div>
                </div>
                <hr></hr>
                <div className="text">
                    <p> <b>Description:</b> {spellDetails.desc}</p>

                </div>


                <hr></hr>

                <div className="text">
                    <p> <b>Range:</b> {spellDetails.range}</p>

                </div>
                <hr></hr>

                <div className="text">
                    <p> <b>Component:</b> {spellDetails.components.toString()}</p>

                </div>
                <hr></hr>

                <div className="text">
                    <p> <b>Duration:</b> {spellDetails.duration}</p>

                </div>
                <hr></hr>

                <div className="text">
                    <p> <b>School:</b> {spellDetails.school["name"]}</p>

                </div>
                <hr></hr>


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
