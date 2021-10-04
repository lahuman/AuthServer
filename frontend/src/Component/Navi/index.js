import React from 'react';
import {
    Link
} from "react-router-dom";
import instance from "../../apiInstance";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Home';
import styled from '@emotion/styled';

const CustomLink = styled(Link)(({ theme }) => ({
    marginRight: theme.spacing(2),
    marginLeft: 0,
    color: '#fff',
    textDecoration: 'none',
}));

export default function Navi() {

    React.useEffect(() => {
        const checkLogin = async () => {
            await instance.get('/loginCheck');
        }
        checkLogin();
    }, []);


    return <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                     <CustomLink to="/"><MenuIcon /></CustomLink>
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    mr="10px"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                    <CustomLink to="/user">User</CustomLink>
                </Typography>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                    <CustomLink to="/role">Role</CustomLink>
                </Typography>
            </Toolbar>
        </AppBar>
    </Box>;
}