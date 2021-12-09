import { Box, Divider, Grid, Typography, ListItem, ListItemText } from "@mui/material";

import { useAuth } from '../../contexts/Auth'

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
                <Grid item pt={3} pb={1}>
                    <Typography variant="h5" fontWeight="bold" ml={2}>
                        Profile
                    </Typography>
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>

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