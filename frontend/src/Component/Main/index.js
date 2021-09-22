import React from "react";
import {
    Link
} from "react-router-dom";
import instance from "../../apiInstance";
export default function Main() {

    const [user, setUser] = React.useState(null);
    React.useEffect(() => {
        const checkLogin = async () => {
            const { data } = await instance.get('/loginCheck');
            setUser(data);
        }
        checkLogin();
    }, []);

    return (
        <>
            <ul>
                <li>
                    <Link to="/">Main</Link>
                </li>
                {/* <li>
                    <Link to="/user">User</Link>
                </li>
                <li>
                    <Link to="/role">Role</Link>
                </li> */}
            </ul>
            <div>
                {user && JSON.stringify(user)}
            </div>
        </>
    );
}
