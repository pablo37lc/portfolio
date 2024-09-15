import React from "react";
import { Link } from "react-router-dom";

function Navigation( { user } ) {
    
    const naviStyle = {
        marginLeft: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: 12,
    }

    return (
        <nav>
            <div style={{ display : "flex", justifyContent : "center", marginTop : 50 }}>
                <div>
                    <Link to = "/" style = {naviStyle} >
                        <span style={{ marginTop: 10 }}>
                            Portfolio
                        </span>
                    </Link>
                </div>
                <div>
                    <Link to = "/profile" style = {naviStyle} >
                        <span style={{ marginTop: 10 }}>
                            {user.displayName ?
                                `${user.displayName}의 Profile`
                            :
                                "Profile"
                            }
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;