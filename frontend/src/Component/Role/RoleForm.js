import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';

import apiInstance from '../../apiInstance';

export default function RoleForm({ roleInfo = null, handleClose }) {

    const [roleName, setRoleName] = React.useState(roleInfo && roleInfo[1]);

    const postRole = async () => {
        const data = { role_name: roleName }
        if (roleInfo) {
            await apiInstance.put(`/roles/${roleInfo[0]}`, { id: roleInfo[0], ...data });
        } else {
            await apiInstance.post('/roles', data);
        }
        handleClose();
    }

    return (
        <React.Fragment>
            <Container component="main" minWidth="xs">
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, }}>
                    <Typography component="h1" variant="h4" align="center">
                        Role Info
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {roleInfo && "Modify" || "Add"}
                    </Typography>
                    <Grid container spacing={3} >
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="roleName"
                                name="roleName"
                                label="RoleName"
                                fullWidth
                                variant="standard"
                                value={roleName}
                                onChange={e => setRoleName(e.target.value)}
                            />
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
                                onClick={postRole}
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