import React from 'react';
import Navi from '../Navi';
import CustomTable from '../CustomTable';
import instance from "../../apiInstance";

const dateFormat = (str) => str ? new Date(str).toLocaleDateString() : '';

export default function Role() {
    const [role, setRole] = React.useState(null);
    React.useEffect(() => {
        const getRole = async () => {
            const { data } = await instance.get('/roles');
            setRole(data.map((d) => ({ ...d, createdAt: dateFormat(d.createdAt), updatedAt: dateFormat(d.updatedAt), deletedAt: dateFormat(d.deletedAt) })));
        }
        getRole();
    }, []);
    return <>
        <Navi />
        {role && <CustomTable title="Role List" header={Object.keys(role[0])} data={[...role.map(r => Object.values(r))]} />}
    </>;
}