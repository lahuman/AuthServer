import React from 'react';

import Navi from '../Navi';
import CustomTable from '../CustomTable';
import instance from "../../apiInstance";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';

const dateFormat = (str) => str ? new Date(str).toLocaleDateString() : '';

export default function User() {
    const [users, setUsers] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        const getUsers = async () => {
            const { data } = await instance.get('/users');
            setUsers(data.map(({ Roles, ...d }) => ({ ...d, createdAt: dateFormat(d.createdAt), updatedAt: dateFormat(d.updatedAt), deletedAt: dateFormat(d.deletedAt), roles: Roles.map(r => r.role_name).join(",") })));
        }
        getUsers();
    }, []);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
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
                <Button variant="contained" onClick={handleClickOpen}>Add User</Button>
            </Grid>
        </Grid>
        {users && <CustomTable title="User List" header={Object.keys(users[0])} data={[...users.map(user => Object.values(user))]} />}

        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Add User</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    </>;
}