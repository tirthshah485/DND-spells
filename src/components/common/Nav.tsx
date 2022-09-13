import { Link } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

import "./Nav.css";

// Navigation bar with navigation links [All Spells and Favourites]

export function Navigation() {
    return (
        <Nav data-testid="navigation" className="navigation ms-auto" navbar>
            <NavItem>
                <Link to="/">All Spells</Link>
            </NavItem>
            <NavItem>
                <Link to="/favourite">Favourites</Link>
            </NavItem>
        </Nav>
    );
}
