import React from 'react';

import Navi from '../Navi';
import CustomTable from '../CustomTable';
import instance from "../../apiInstance";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import UserForm from './UserForm';

const dateFormat = (str) => str ? new Date(str).toLocaleDateString() : '';

export default function User() {
    const [users, setUsers] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const getUsers = async () => {
        const { data } = await instance.get('/users');
        setUsers(data.map(({ Roles, ...d }) => ({ ...d, createdAt: dateFormat(d.createdAt), updatedAt: dateFormat(d.updatedAt), deletedAt: dateFormat(d.deletedAt), roles: Roles.map(r => r.role_name).join(",") })));
    }

    React.useEffect(() => {    
        getUsers();
    }, []);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        getUsers();
        setOpen(false);
    };

    return <>
        <Navi />
        <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
        >
            <Grid item mt="15px" mr="15px">
                <Button variant="contained" onClick={() => {
                    setUser(null);
                    handleClickOpen();
                }}>Add User</Button>
            </Grid>
        </Grid>
        {users && <CustomTable title="User List" header={Object.keys(users[0])} data={[...users.map(user => Object.values(user))]} onClick={u => {
            setUser(u);
            setOpen(true);
        }} />}

        <Dialog open={open}>
            <UserForm userInfo={user} handleClose={handleClose}/>
        </Dialog>
    </>;
}