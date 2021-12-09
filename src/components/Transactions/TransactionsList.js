import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {List} from '@mui/material/';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import moment from 'moment';

import { Transactions } from '../../providers/Transactions';


export function TransactionsList() {
    const {getTransactionsByStatus} = Transactions();
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate()

    async function handleTxUpdate() {
        const txs = await getTransactionsByStatus('FINAL')
        setTransactions(txs)
    }
    
    function handleClick(item) {
        
        navigate('/saledetail', {
            state: item
        })
    }

    useEffect(() => {
        handleTxUpdate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


  return (
        <>
            <Typography variant="subtitle1" fontWeight="bold" ml={2}>
                Recent Transactions
            </Typography>
            
            <List xs ={12}>
                <Divider />
                {transactions.map((item) => (
                    <div key={item.id}>
                    <ListItem button 
                        key={item.id} 
                        onClick={() => handleClick(item)}
                    >
                    
                        <ListItemText
                            primaryTypographyProps={{ variant:"caption" }}
                            xs={12}>
                                {moment(item.effective_date).format('lll')}
                        </ListItemText>
                        <ListItemText
                            primaryTypographyProps={{ variant:"caption" }}
                            xs={10}>
                            {item.transaction_detail}
                        </ListItemText>
                        <ListItemText
                            primaryTypographyProps={{ variant:"caption" }}
                            align='right'
                            xs={10}
                        >
                            {`$${Number(item.amount).toFixed(2)}`}
                        </ListItemText>
                    </ListItem >
                    <Divider />
                    </div>
                ))}
                
                <Divider />
            </List>
        </>
  );
};