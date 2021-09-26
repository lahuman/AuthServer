import React from 'react';
import {
    Link
} from "react-router-dom";
import instance from "../../apiInstance";
import './navi.scss';

export default function Navi() {

    React.useEffect(() => {
        const checkLogin = async () => {
            await instance.get('/loginCheck');
        }
        checkLogin();
    }, []);


    return <header>
        <nav>
            <ul>
                <li>
                    <Link to="/">Main</Link>
                </li>
                <li>
                    <Link to="/user">User</Link>
                </li>
                <li>
                    <Link to="/role">Role</Link>
                </li>
            </ul>
        </nav>
    </header>;
}