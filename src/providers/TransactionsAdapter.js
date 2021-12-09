import { supabase } from '../supabase'
import {v4 as uuid} from 'uuid'

export const TransactionsAdapter = () => {
    
    const signIn = async (email, password) => {
        const { user, session, error } = await supabase.auth.signIn({
            email: email,
            password: password
        })
        if (error) throw new Error('TransactionsAdapter - signIn - ', error);
        return [user, session]
    };

    async function newTransaction(tx) {
        // Create new transaction in the database
        tx.created_by = supabase.auth.session().user.id
        // @TODO Refactor data model
        // if !exists
        if (!tx.hasOwnProperty('balance')) tx.balance=0.00
        if (!tx.hasOwnProperty('prior_balance')) tx.prior_balance=0.00
        if (!tx.hasOwnProperty('source')) tx.source="Web"
        if (!tx.hasOwnProperty('processed')) tx.processed=false
        // if exists
        if (tx.hasOwnProperty('id')) delete tx.id
        if (tx.hasOwnProperty('inserted_at')) delete tx.inserted_at
        if (tx.hasOwnProperty('effective_date')) delete tx.effective_date
        // create transaction
        let { data, error } = await supabase
            .from("transactions")
            .insert(tx)
            .single();
        if (error) console.log("createTx - error - : ", error);
        return ([data, error]);
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
        if(!data) console.log("updateToProcessed - no results found")
        return data
    };

    async function validateTransactionState(tx, expected_state) {
        const validTx = await getStateByID(tx)
        if(validTx.transaction_state!==expected_state) {
            throw new Error('validateTransactionState - invalid tx state')
        }
        return true
    }

    const createTransaction = async (tx, status, detail) => {
        let expected_state = null

        // 
        if(tx.transaction_id && status === "PENDING_APPROVAL") {
            throw new Error('tx uuid exists on PENDING_APPROVAL')
        }

        switch (status) {
            case "PENDING_APPROVAL":
                tx.transaction_id = uuid();
                tx.transaction_state = 500;
                tx.status = status
                break;
            case "APPROVED":
                expected_state = 500
                tx.transaction_state = 1500;
                tx.status = status
                break;
            case "FINAL":
                expected_state = 1500
                tx.transaction_state = 2500;
                tx.status = status
                break;
            default:
                break;
        }

        if(status==='FINAL' && tx.type==="INVOICE") {
            tx.amount = tx.amount*-1
        }

        // For existing transactions, check state, mark as processed
        if(expected_state) {
            await validateTransactionState(tx,expected_state)

            const updated = await updateToProcessed(tx, true);
            if (!updated) throw new Error('createTransaction - updateToProcessed - error');
        }
        // TODO Roll back transaction if fail
        if(detail) tx.transaction_detail = detail
        const [data, error] = await newTransaction(tx)
        if(error) throw new Error('createTransaction - error - creating Tx, ')
        return data 
    }

    const getTransactionsByStatus = async (status) => {
        // const session = supabase.auth.session()
        // console.log(session)
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


    return {
        signIn,
        createTransaction,
        getTransactionsByStatus,
        
    }

}