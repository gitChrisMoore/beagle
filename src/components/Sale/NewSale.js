import { Box, 
    Grid, 
    Divider, 
    Typography, 
    Button,
    TextField,
    ListItem,
    ListItemText,
    ListItemIcon } from "@mui/material";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {Transactions} from '../TxProcessor/Tansactions';


export function NewSale() {
    const navigate = useNavigate()
    const createTransactionWrapperNew = Transactions();

    const user_idRef = useRef();
    const amountRef = useRef();

    function handleClickBack() {
        navigate('/sale');
    }

    async function handleSubmit(e) {
        e.preventDefault()

        
        const id = user_idRef.current.value
        const amount = amountRef.current.value

        console.log('id___', id);
        console.log('amount', amount);

        const transaction = {
            user_id: id,
            amount: amount,
            account_number: id,
            type: "INVOICE",
            status: "PENDING_APPROVAL",
            balance: 0.00,
            prior_balance: 0.00,
            source: "Web",
            processed: false,
        }

        const res = await createTransactionWrapperNew(transaction);        
        
        if(res.effective_date) {
            console.log(res)
            navigate('/saledetail', {
                state: res
            })
        } else {
            console.log("NewSale - handleSubmit - Error ")
        }
        
    };

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
                        New Sale
                    </Typography>
                </Grid>
                
                <Box component="form" 
                    onSubmit={handleSubmit} 
                    data-testid="form_test" 
                    noValidate 
                    // sx={{ mt: 2 }}
                    p={2}
                    
                >
                    <Grid container >
                        <Grid item xs={9} p={1} >
                            <TextField 
                                id="customer-id"
                                label="Customer ID"
                                variant="standard"
                                fullWidth
                                inputRef={user_idRef}
                                required
                            />
                        </Grid>
                        <Grid item xs={3} p={1} mt={1}>
                            <Button 
                                // onClick={handleScanCustomer}
                                autoFocus
                                fullWidth
                                variant="contained"
                                color="secondary"
                                > 
                                Scan
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} p={1}>
                        <TextField 
                            id="amount-sale"
                            label="Amount of Sale"
                            variant="standard"
                            type="number"
                            fullWidth
                            // value={customerID}
                            inputRef={amountRef}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} p={1} mt={2}>
                        <Button 
                            type="submit"
                            autoFocus
                            fullWidth
                            variant="contained"
                            > 
                            Create
                        </Button>
                    </Grid>
                </Box>

            </Box>
    </>
    )
}