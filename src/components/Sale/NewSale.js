import { Box, 
    Grid, 
    Divider, 
    Typography, 
    Button,
    TextField,
    ListItem,
    ListItemText,
    ListItemIcon } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { TransactionsAdapter } from "../../providers/TransactionsAdapter";

export function NewSale() {
    const navigate = useNavigate()
    const {createTransaction} = TransactionsAdapter();
    const [customerID, setCustomerID] = useState('')
    const { state } = useLocation();

    const user_idRef = useRef();
    const amountRef = useRef();

    function handleClickBack() {
        navigate('/sale');
    }

    function handleScanCustomer() {
        navigate('/qrscanner');
    }
    
    function onChangesetCustomerID(e) {
        setCustomerID(e.target.value)
    }
    
    useEffect(() => {
        setCustomerID(state?.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()

        const id = user_idRef.current.value
        const amount = amountRef.current.value

        const transaction = {
            user_id: id,
            amount: amount,
            account_number: id,
            type: "INVOICE",
        }

        const res = await createTransaction(transaction, 'PENDING_APPROVAL');        
        
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
                                value={customerID}
                                required
                                onChange={onChangesetCustomerID}
                            />
                        </Grid>
                        <Grid item xs={3} p={1} mt={1}>
                            <Button 
                                onClick={handleScanCustomer}
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