import { useLocation, useNavigate } from 'react-router-dom'

import {Grid,
        ListItem,
        Box,
        ListItemIcon,
        ListItemText,
        Typography,
        Divider} from "@mui/material/";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import moment from 'moment';

// import { SaleCancelButton } from './SaleCancelButton';
import { SaleNotificationButton } from './SaleNotificationButton';

export function SaleDetail() {
    const { state } = useLocation();
    const navigate = useNavigate()
    // console.log(state)

    function handleClickBack() {
        navigate('/sale');
    }

    return (
      <>
        <Box 
            sx={{ maxWidth: 'sm' }}
            margin='auto'
        >
            <Grid item xs={12} mt={2}>
                    <ListItem button  onClick={handleClickBack}>
                        <ListItemIcon>
                            <ChevronLeftIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="subtitle1">
                                Back to Sales
                            </Typography>
                        </ListItemText>
                    </ListItem>
            </Grid>

            <Grid item>
                <Divider />
            </Grid>
            <Grid item pt={3}>
                <Typography variant="subtitle1" fontWeight="bold" ml={2}>
                     Sale Detail
                </Typography>
            </Grid>
            <Box  display= 'flex' p={1}>
                <Grid container>
                    
                    <ListItem xs={12}>
                        <ListItemText
                            primary={state?.user_id}
                            secondary="Customer ID"
                        />
                    </ListItem>

                    <ListItem xs={12}>
                        <ListItemText
                            primary={`$${Number(state?.amount).toFixed(2)}`}
                            secondary="Amount"
                        />
                    </ListItem>

                    <ListItem xs={12}>
                        <ListItemText
                            primary={moment(state?.effective_date).format('lll')}
                            secondary="Date"
                        />
                    </ListItem>

                    <ListItem xs={12}>
                        <ListItemText
                            primary={state?.type}
                            secondary="Type"
                        />
                    </ListItem>

                    <ListItem xs={12}>
                        <ListItemText
                            primary={state?.status}
                            secondary="Status"
                        />
                    </ListItem>

                </Grid>
            </Box>

            <Box  display= 'flex' p={1}>
                    <Grid container>
                        <Grid item xs={12} p={1}> 
                            < SaleNotificationButton data={state}/>
                        </Grid>
                        <Grid item xs={5} p={1}> 
                            {/* < SaleCancelButton data={state}/> */}
                        </Grid>
                    </Grid>
            </Box>
        </Box>
      </>
      
    );
};