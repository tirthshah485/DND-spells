import React, { useState } from "react";
import { Navigation } from "./Nav";
import { Collapse, Navbar, NavbarToggler, NavbarBrand } from "reactstrap";
import "./Header.css";

// Header With DND Logo and Navigation components 
export function Header(props: any) {
    
    
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <div data-testid="header">
            <Navbar {...props}>
                <NavbarBrand href="/">
                    
                    <img
                        alt="logo"
                        src="./dnd-logo1.png"
                        style={{
                            height: 50,
                            width: 260,
                            margin: "0 15px",
                            textAlign:"center"
                            
                        }}
                    />
                    
                    
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Navigation />
                </Collapse>
                
                
                
            </Navbar>
        </div>
    );
}
