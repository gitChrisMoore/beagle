import { supabase } from '../../supabase'
import {v4 as uuid} from 'uuid'

export const Transactions = () => {


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
        } else {
            console.log("getStateByID - no results found")
            return null
        }
    };

    const updateToProcessed = async (tx, flag) => {
            
        let {data, error} = await supabase
            .from("transactions")
            .update({ processed: flag})
            .match({ id: tx.id })
            .select("*")
            .eq('id', tx.id)
            .limit(1);
        if (error) console.log('error - ', error)
        if (data.length > 0) {
            // console.log("found data, ", data)
            return data[0]
        } else {
            console.log("updateToProcessed - no results found")
            return null
        }
        
    };

    async function createTx(tx, state, status) {
        
        try {
            delete tx.id
            delete tx.inserted_at
            delete tx.effective_date
            tx.transaction_state = state;
            tx.status = status;

        } catch (error) {
            throw new Error('createTx error creating tx, ', error)
        }


        let { data, error } = await supabase
            .from("transactions")
            .insert(tx)
            .single();
        if (error) {
            console.log("createTx - error - : ", error);
            console.log("createTx - error - tx -: ", tx);
            console.log(error)
        } else if (data) {
            console.log('createTx - success - ', data)
            return data
        } else {
            console.log("createTx - no results found")
            return null
        }
    }


    const createTransactionWrapper = async (transaction, tx_detail, tx_status, current_tx, future_tx, payment=false) => {
        const validTx = await getStateByID(transaction)
        
        if (validTx.transaction_state !== current_tx) {
            return console.log('createFinal - invalid tx state')
        }
        const updated = await updateToProcessed(validTx, true)
        if (!updated) return console.log('createFinal - could not update tx')

        validTx.transaction_detail = tx_detail
        if(payment) validTx.amount = validTx.amount*-1

        const newTx = await createTx(validTx, future_tx, tx_status)

        if(newTx) return newTx
        else return new Error('createFinal - error - creating Tx, ', newTx)
    }

    const createTransactionWrapperNew = async (transaction, tx_detail) => {

        transaction.transaction_id = uuid();
        transaction.transaction_state = 500;
        transaction.status = 'PENDING_APPROVAL'
        transaction.transaction_detail = tx_detail

        const newTx = await createTx(transaction, 500, 'PENDING_APPROVAL')

        if(newTx) return newTx
        else return new Error('createFinal - error - creating Tx, ', newTx)
    }



    return (
        createTransactionWrapper,
        createTransactionWrapperNew
    )

};