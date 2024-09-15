import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";

import { authService } from "../firebase";

function Auth(params) {
    
    const onSocialClick = async(event) => {
        const {target : {name}}  = event;

        let provider;

        if(name === "google") {
            provider = new GoogleAuthProvider();
        }

        const data = await signInWithPopup(authService, provider);
        console.log(data);
    }

    return (
        <div>
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">
                    Continue with Google
                </button>
            </div>
        </div>
    )
}

export default Auth;