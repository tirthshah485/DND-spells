import { Link } from "react-router-dom";
import { SuitHeart ,SuitHeartFill} from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import {
    addToFavourite,
    removeFromfavourite,
} from "../../features/spell/spellSlice";
import { SpellState } from "../../types/SpellState";
import "./SpellListItem.css";

// Added React-Toastify for notification alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type SpellListItemProp = {
    spell: SpellState;
    isFavourite: boolean;
    updateSpells?: () => void;
};

// Display each spell with proper Details and add to favorites spell as well
export function SpellListItem(props: SpellListItemProp) {
    
    const dispatch = useDispatch();
    let spell = props.spell;
    let isFavourite = props.isFavourite;

    const bookMarkHandler = () => {
        if (isFavourite) {
            dispatch(removeFromfavourite(spell.index));
            toast.info("Spell remove Successfully from favourite", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            
        } else {
            dispatch(addToFavourite(spell));
            toast.info("Spell added Successfully in favourite", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            
            if (props.updateSpells) {
                props.updateSpells();
            }
            
        }
    };

    

    return (
        <div className="spell-li">
            <Link className="spell-name" to={"/spell/" + spell.index}>
                {spell.name}
            </Link>
            {isFavourite ? (
               
                <SuitHeartFill
                    className="fav-icon"
                    // color="gold"
                    onClick={bookMarkHandler}
                />
            ) : (
                <SuitHeart
                    className="fav-icon"
                    // color="gray"
                    onClick={bookMarkHandler}
                />
            )}
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
