import { Grid } from "@mui/material";
import React from "react";

import instance from "../../apiInstance";
import CustomTable from "../CustomTable";
import Navi from "../Navi";


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
            <Navi />
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                MAIN PAGE
            </Grid>
        </>
    );
}
