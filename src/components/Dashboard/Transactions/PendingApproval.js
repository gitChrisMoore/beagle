import { useRef,useState } from 'react';
import {TextField,
    Container,
    Typography,
    Button,
    Box} from "@mui/material/";

import {Transactions} from '../../TxProcessor/Tansactions'

export function PendingApproval() {
    const [tx, setTx] = useState('');
    const createTransactionWrapperNew = Transactions();

    const user_idRef = useRef();
    const amountRef = useRef();
    const typeRef = useRef();
    const statusRef = useRef();

    async function handleSubmit(e) {
        e.preventDefault()

        const transaction = {
            user_id: user_idRef.current.value,
            amount: amountRef.current.value,
            type: typeRef.current.value,
            status: statusRef.current.value,

            account_number: user_idRef.current.value,
            balance: 0.00,
            prior_balance: 0.00,
            source: "Web",
            processed: false,
        }

        const res = await createTransactionWrapperNew(transaction);        
        // console.log(res)
        setTx(res)
    };

    return (
        <div>
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
            >
                <Box component="form" onSubmit={handleSubmit} data-testid="form_test" noValidate sx={{ mt: 1 }}>
                    <Typography variant="h5">
                        Pending Approval
                    </Typography>
                    <TextField
                        inputRef={user_idRef}
                        data-testid="user_idRef"
                        fullWidth
                    />
                    <TextField
                        inputRef={amountRef}
                        data-testid="amountRef"
                        fullWidth
                    />
                    <TextField
                        inputRef={typeRef}
                        data-testid="typeRef"
                        fullWidth
                    />
                    <TextField
                        inputRef={statusRef}
                        data-testid="statusRef"
                        fullWidth
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        data-testid="submitButton"
                        sx={{ mt: 2, mb: 2 }}
                        >
                        Create
                    </Button>

                </Box>
            </Box>
        </Container>
        <Box>
            {tx.user_id}
        </Box>
    </div>
    )
}