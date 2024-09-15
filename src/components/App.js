import React, { useEffect, useState } from "react";

import { authService } from "../firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

import AppRouter from "../routes/Router";

function App() {

    const [ init    , setInit       ] = useState(false);
    const [ isLogIn , setIsLogIn    ] = useState(false);
    const [ user    , setUser       ] = useState(null);

    useEffect( () => {
        onAuthStateChanged( authService, (user) => {
            if(user) {
                setIsLogIn(true);
                setUser( {
                    displayName : user.displayName,
                    uid : user.uid,
                    updateProfile : () => updateProfile( user, { displayName: user.displayName } ),
                });
            }
            else {
                setIsLogIn(false);
            }
            setInit(true);
        } )
    } ,[] );

    const refreshUser = () => {
        const user = authService.currentUser;
        setUser( {
            displayName : user.displayName,
            uid : user.uid,
            updateProfile : (args) => user.updateProfile(args),
        } );
    }
    
    return (
        <>
            {init? <AppRouter refreshUser={refreshUser} isLogIn={isLogIn} user={user} /> : "Initializing..."}
        </>
    )
}

export default App;