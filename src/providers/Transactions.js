import { supabase } from '../supabase'
import {v4 as uuid} from 'uuid'
import { useAuth } from '../contexts/Auth'



async function makeTx(oldTransaction, status, transaction_detail) {
    

    let tx = oldTransaction



    if(status === 'PENDING_APPROVAL') {
        tx.transaction_id = uuid();
        tx.transaction_state = 500;
        tx.status = 'PENDING_APPROVAL'
    } else if (status === 'APPROVED') {
        tx.transaction_state = 1500;
        tx.status = 'APPROVED';
    } else if (status === 'FINAL') {
        tx.transaction_state = 2500;
        tx.status = 'FINAL';
    } else if (status === 'NON_SUFFICIENT_FUNDS') {
        tx.transaction_state = 2000;
        tx.status = 'NON_SUFFICIENT_FUNDS';
    }
    
    if (transaction_detail) {
        tx.transaction_detail = transaction_detail
    }

    delete tx.id
    delete tx.inserted_at
    delete tx.effective_date

    return tx

}

async function createTx(tx) {
        
        let { data, error } = await supabase
            .from("transactions")
              .insert(tx)
              .single();
        if (error) {
            console.log("createTx - error - : ", error);
            console.log(error)
        } else if (data) {
            console.log('createTx - success - ', data)
            return data
        }

}

export const Transactions = () => {
    
    const { user } = useAuth()
    
    const createPendingApproval = async (oldTransaction) => {

        oldTransaction.created_by = user.id

        const tx = await makeTx(oldTransaction, 'PENDING_APPROVAL');
        if (tx) {
            const res = await createTx(tx);
            return res
        }
        
    };

    const createApproved = async (oldTransaction) => {

        const priorTx = await getStateByID(oldTransaction);


        if (priorTx.transaction_state === 500) { //Make Sure its in prior state
            
            // console.log(priorTx)
            const tx = await makeTx(oldTransaction, 'APPROVED');
            if (tx) {
                const udpated = await updateToProcessed(priorTx);
                const res = await createTx(tx);
                if(udpated && res) {
                    return res
                }else {
                    console.log('createApproved Failed')
                }
            }
        } else {
            console.log('Transaction state error - ', priorTx)
            return 
        }
        
    };

    const createFinal = async (currentTx, transaction_detail) => {

        const priorTx = await getStateByID(currentTx);
        if (priorTx.transaction_state === 1500) { //Make Sure its in prior state
            
            

            const tx = await makeTx(currentTx, 'FINAL', transaction_detail);
            if (tx) {
                
                const udpated = await updateToProcessed(priorTx);
                const res = await createTx(tx);
                if(udpated && res) {
                    return res
                }else {
                    console.log('Create Final Failed')
                }
                
            }
        } else {
            console.log('Transaction state error - ', priorTx)
            return 
        }
        
    };

    const createNonSufficientFunds = async (currentTx, transaction_detail) => {

        const priorTx = await getStateByID(currentTx);
        if (priorTx.transaction_state === 1500) { //Make Sure its in prior state
            
            

            const tx = await makeTx(currentTx, 'NON_SUFFICIENT_FUNDS', transaction_detail);
            if (tx) {
                
                const udpated = await updateToProcessed(priorTx);
                const res = await createTx(tx);
                if(udpated && res) {
                    return res
                }else {
                    console.log('ERROR - createNonSufficientFunds')
                }
                
            }
        } else {
            console.log('Transaction state error - ', priorTx)
            return 
        }
        
    };

    const updateToProcessed = async (tx) => {
        
        let {data, error} = await supabase
            .from("transactions")
            .update({ processed: true})
            .match({ id: tx.id })
            .select("*")
            .eq('id', tx.id)
            .limit(1);
        if (error) console.log('error - ', error)
        if (data.length > 0) {
            // console.log("found data, ", data)
            return data[0]
        }
        
    };

    const getStateByID = async (tx) => {

        let {data, error} = await supabase
            .from('transactions')
            .select("*")
            .order("transaction_state", { ascending: false })
            .eq('transaction_id', tx.transaction_id)
            .limit(1)
        if (error) console.log('error - ', error)
        if (data.length > 0) {
            // console.log("found data, ", data)
            return data[0]
        }
    };

    const getByID = async (tx) => {

        let {data, error} = await supabase
            .from('transactions')
            .select("*")
            .order("id", { ascending: false })
            .eq('id', tx.id)
            .limit(1);
        if (error) console.log('error - ', error)
        if (data.length > 0) {
            // console.log("found data, ", data)
            return data[0]
        }
    };

    const getTransactionsByStatus = async (status) => {

        let {data, error} = await supabase
            .from('transactions')
            .select("*")
            .eq('status', status)
            .eq('processed', false)
            .order("id", { ascending: false })
        if (error) console.log('error - ', error)
        if (data.length > 0) {
            return data
        } else {
            return []
        }
    };

    const getApprovedTransactions = async () => {

        const res = await getTransactionsByStatus('APPROVED');
        return res
    };

    const getCurrentBalanceByUserID = async (id) => {
        let {data, error} = await supabase
            .from('current_balance')
            .select("*")
            .eq('user_id', id)
            .single()
        if (error) console.log('error - ', error)
        if (data) {
            return data
        } else {
            return null
        }

    };

    return {
        createPendingApproval,
        createApproved,
        getTransactionsByStatus,
        getCurrentBalanceByUserID,
        getByID,
        getApprovedTransactions,
        createFinal,
        createNonSufficientFunds
    }

}