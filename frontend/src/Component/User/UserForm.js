import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';

import Select from '@mui/material/Select';

import apiInstance from '../../apiInstance';

export default function UserForm({ userInfo = null, handleClose }) {

    const [userId, setUserId] = React.useState(userInfo && userInfo[1]);
    const [password, setPassword] = React.useState(userInfo && userInfo[2]);
    const [description, setDescription] = React.useState(userInfo && userInfo[3]);
    const [roles, setRoles] = React.useState([]);
    const [myRoles, setMyRoles] = React.useState(userInfo && userInfo[7].split(',') || []);

    const postUser = async () => {
        const data = { user_id: userId, password, description, roles: myRoles.join(",") }
        if (userInfo) {
            await apiInstance.put(`/users/${userId}`, { id: userInfo[0], ...data });
        } else {
            await apiInstance.post('/users', data);
        }
        handleClose();
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setMyRoles(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    React.useEffect(() => {
        const getRoles = async () => {
            const { data } = await apiInstance.get('/roles');
            setRoles(data);
            console.log(data)
        }
        getRoles();
        console.log(userInfo);
    }, [])

    return (
        <React.Fragment>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        User Info
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {userInfo && "Modify" || "Add"}
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                disabled={userInfo}
                                required
                                id="userId"
                                name="userId"
                                label="User Id"
                                fullWidth
                                variant="standard"
                                value={userId}
                                onChange={e => setUserId(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="password"
                                name="password"
                                label="Password"
                                fullWidth
                                variant="standard"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="description"
                                name="description"
                                label="Description"
                                fullWidth
                                variant="standard"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id="demo-multiple-name-label">Role</InputLabel>
                            <Select
                                multiple
                                value={myRoles}
                                onChange={handleChange}
                                input={<OutlinedInput label="Role" />}
                            >
                                {roles.map(({ id, role_name }) => (
                                    <MenuItem
                                        key={id}
                                        value={role_name}
                                    >
                                        {role_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <React.Fragment>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                            <Button sx={{ mt: 3, ml: 1 }} onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ mt: 3, ml: 1 }}
                                onClick={postUser}
                            >
                                Ok
                            </Button>
                        </Box>
                    </React.Fragment>
                </Paper>
            </Container>
        </React.Fragment>
    );
}