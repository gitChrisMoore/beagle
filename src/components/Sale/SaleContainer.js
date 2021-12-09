import { useNavigate } from 'react-router-dom';
import { Box, 
        Grid, 
        Divider, 
        Typography, 
        ListItem,
        ListItemText,
        ListItemIcon } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {TransactionsList} from '../Transactions/TransactionsList'

export function SaleContainer() {
    const navigate = useNavigate()

    function handleClickNewSale() {
        navigate('/newsale');
    }

    return (
        <>
            <Box 
                sx={{ maxWidth: 'sm' }}
                margin='auto'
            >
                <Grid item pt={3} pb={1}>
                    <Typography variant="h5" fontWeight="bold" ml={2}>
                        Sales
                    </Typography>
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>

                <Grid item xs={12} mt={2}>
                        <ListItem button  onClick={handleClickNewSale}>
                            <ListItemText>
                                <Typography variant="subtitle1">
                                    Create Sale
                                </Typography>
                            </ListItemText>
    
                            <ListItemIcon>
                                <ChevronRightIcon fontSize="large"/>
                            </ListItemIcon>
                        </ListItem>
                </Grid>

                <Grid item  pt={3}>
                    <TransactionsList />
                </Grid>

            </Box>
    </>
    )
}