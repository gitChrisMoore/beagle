import {Divider, 
        Grid, 
        Typography
        } from "@mui/material";

export function PageHeading({title}) {


    return (
        <>
            <Grid item pt={3} pb={1}>
                <Typography variant="h5" fontWeight="bold" ml={2}>
                    {title}
                </Typography>
            </Grid>
            
            <Grid item>
                    <Divider />
            </Grid>
        </>
    )
}