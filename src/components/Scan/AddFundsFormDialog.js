import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useRef } from 'react';
import { useAuth } from '../../contexts/Auth';
import { Transactions } from '../../providers/Transactions'

export function AddFundsFormDialog({ open, setOpen, amount, setAmount }) {
    const amountRef = useRef();
    const {user} = useAuth();
    const {createPendingApproval} = Transactions();

    async function handleAccept() {
        
        const amount = amountRef.current.value
        
        let transaction = {
            user_id: user.id,
            account_number: user.id,
            amount: amount,
            balance: 0.00,
            prior_balance: 0.00,
            type: "FUNDS_ADD",
            source: "Web",
            status: "PENDING_APPROVAL",
            processed: false
        }
        
        console.log(transaction)
        
        let res = await createPendingApproval(transaction)
        if (res) setOpen(false);

    };

    const handleClose = () => {
        setOpen(false);
    };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Funds</DialogTitle>
        <DialogContent>
          <DialogContentText>
            How much would you like to deposit?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            inputRef={amountRef}
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAccept}>Deposit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}