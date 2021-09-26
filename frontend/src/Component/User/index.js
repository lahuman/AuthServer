import React from 'react';

import Navi from '../Navi';
import CustomTable from '../CustomTable';
import instance from "../../apiInstance";

const dateFormat = (str) => str ? new Date(str).toLocaleDateString() : '';

export default function User() {
    const [users, setUsers] = React.useState(null);
    React.useEffect(() => {
        const getUsers = async () => {
            const { data } = await instance.get('/users');
            setUsers(data.map(({ Roles, ...d }) => ({ ...d, createdAt: dateFormat(d.createdAt), updatedAt: dateFormat(d.updatedAt), deletedAt: dateFormat(d.deletedAt), roles: Roles.map(r => r.role_name).join(",") })));
        }
        getUsers();
    }, []);
    return <>
        <Navi />
        {users && <CustomTable title="User List" header={Object.keys(users[0])} data={[...users.map(user => Object.values(user))]} />}
    </>;
}