import { useNavigate } from 'react-router-dom';
import { Box, 
        Grid,
        Typography, 
        ListItem,
        ListItemText,
        ListItemIcon } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {TransactionsList} from '../Transactions/TransactionsList'
import { PageHeading } from '../Common/PageHeading';

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

                <PageHeading title='Sales' />

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