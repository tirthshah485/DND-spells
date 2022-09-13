import { AllSpells } from "./pages/AllSpells";
import { FavouriteSpells } from "./pages/FavSpells";
import { SpellInfo } from "./pages/SpellDetail";
import { Header } from "./components/common/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import {
    MDBFooter,
} from 'mdb-react-ui-kit';

import { CloudMoon, CloudMoonFill } from "react-bootstrap-icons";

import "./App.css";

import { useState } from "react";

function App() {

    const [theme, setTheme] = useState('dark')
    const styles: {} = {
        position: "fixed",
        bottom: "0px",
        borderRadius: "0px",
        backgroundColor: '#0a4275'
    };
    const switchTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme)
    }
    return (
        <div className="app" data-theme={theme}>


            <Router basename={process.env.PUBLIC_URL}>
                
                <Header
                    text-align="center"
                    color="dark"
                    light={true}
                    dark={true}
                    full={true}
                    expand="md"
                    container="fluid"
                    fixed="top"
                />

                <Routes>
                    <Route path="/" element={<AllSpells />} />
                    <Route path="/favourite" element={<FavouriteSpells />} />
                    <Route path="/spell/:index" element={<SpellInfo />} />
                </Routes>


                <MDBFooter className='bg-dark text-center text-white footer' style={styles}>
                    <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                        <span className='me-3'>The 5th Edition Dungeons and Dragons API</span>
                        <a className='text-white' href='http://www.dnd5eapi.co/'>
                            Know More
                        </a>
                        <button onClick={switchTheme} className="btn btn-secondary btn-sm">

                            Click here to Change Mode   {theme === 'light' ? <CloudMoon size={20} /> : <CloudMoonFill size={20} />}
                        </button>

                    </div>
                </MDBFooter>

            </Router>



        </div>
    );
}

export default App;
