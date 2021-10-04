import React from 'react';
import { Button, Dialog, Grid, DialogContent } from '@mui/material';
import Navi from '../Navi';
import RoleForm from './RoleForm';
import CustomTable from '../CustomTable';
import instance from "../../apiInstance";

const dateFormat = (str) => str ? new Date(str).toLocaleDateString() : '';

export default function Role() {
    const [roles, setRoles] = React.useState(null);
    const [role, setRole] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const getRoles = async () => {
        const { data } = await instance.get('/roles');
        setRoles(data.map((d) => ({ ...d, createdAt: dateFormat(d.createdAt), updatedAt: dateFormat(d.updatedAt), deletedAt: dateFormat(d.deletedAt) })));
    }
    React.useEffect(() => {
        getRoles();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        getRoles();
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
                    setRole(null);
                    handleClickOpen();
                }}>Add Role</Button>
            </Grid>
        </Grid>
        {roles && <CustomTable title="Role List" header={Object.keys(roles[0])} data={[...roles.map(r => Object.values(r))]} onClick={u => {
            setRole(u);
            setOpen(true);
        }} />}

        <Dialog open={open} fullWidth maxWidth="sm">
            <RoleForm roleInfo={role} handleClose={handleClose} />
        </Dialog>
    </>;
}