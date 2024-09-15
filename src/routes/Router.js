import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Auth from "../components/Auth";
import Navigation from "../components/Navigation"
import Profile from "./Profile";
import Portfolio from "./Portfolio";

function AppRouter( { refreshUser, isLogIn, user } ) {

    return (
        <Router>
            {isLogIn && <Navigation user={user} />}
            <div
                style={{
                maxWidth: 890,
                width: "100%",
                margin: "0 auto",
                marginTop: 80,
                display: "flex",
                justifyContent: "center",
                }}
            >
                <Routes>
                    {isLogIn ?
                        <>
                            <Route exact path="/" element={<Portfolio user={user} />} />
                            <Route exact path="/profile" element={<Profile refreshUser={refreshUser} user={user} />} />
                        </>
                    :
                        <Route exact path="/" element={<Auth/>} />
                    }
                </Routes>
            </div>
        </Router>
    )
    
}

export default AppRouter;