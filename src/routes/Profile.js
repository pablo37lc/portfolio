import { signOut } from "firebase/auth"
import { authService } from "../firebase"
import { useNavigate } from "react-router-dom";

function Profile( { refreshUser, user } ) {
    
    const navigate = useNavigate();

    const onLogOutClick = () => {
        signOut(authService);     
        navigate("/");
    };

    return (
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
            Log Out
        </span>
    )
}

export default Profile;