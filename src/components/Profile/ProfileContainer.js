import { Box, Grid, Typography, ListItem, ListItemText } from "@mui/material";

import { useAuth } from '../../contexts/Auth'
import { PageHeading } from "../Common/PageHeading"; 

export function ProfileContainer() {
    const { user, signOut } = useAuth()

    async function handleSignOut() {
        signOut()
    }

    return (
        <>
            <Box 
                sx={{ maxWidth: 'md' }}
                margin='auto'
            >
                <PageHeading title='Profile' />

                <Grid item pt={3}>
                    <Typography variant="subtitle2" fontWeight="bold" ml={2}>
                        {user.email}
                    </Typography>
                </Grid>

                <Grid item pt={3}>
                    <Typography variant="subtitle2" fontWeight="bold" ml={2}>
                        {user.id}
                    </Typography>
                </Grid>

                <ListItem onClick={handleSignOut}>
                    <ListItemText primary='Sign Out' />
                </ListItem>

            </Box>
    </>
    )
}