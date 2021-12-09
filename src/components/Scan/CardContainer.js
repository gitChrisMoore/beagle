import { Paper, Box, Grid, Divider, Typography, Button } from "@mui/material";
import { QRCodeCard } from "./QRCodeCard";

import { AddFundsFormDialog } from "./AddFundsFormDialog"
import { useState } from "react";
import { CurrentBalance } from "../Balance/CurrentBalance"

export function CardContainer() {
    const [ open, setOpen ] = useState(false)
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
    <Box p={3}
        sx={{ maxWidth: 'md' }} 
        margin='auto'
    >
        <Paper elevation={10}>
            <Grid container
                    spacing={3}
                    sx={{ mt: 1, mb: 1}}
                    alignItems="center"
                    
            >
                <Grid item  xs={12}>
                    <QRCodeCard />
                </Grid>

                <Grid item  xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h4" align='center'>
                        <CurrentBalance />
                    </Typography>
                </Grid>

                <Grid item xs={12} margin='auto'>
                    <Button
                        fullWidth
                        onClick={handleClickOpen}
                    >
                    Add Funds
                    </Button>
                </Grid>

            </Grid>
            
        </Paper>
        <AddFundsFormDialog 
            open={open}
            setOpen={setOpen}
            />
    </Box>
    )
}