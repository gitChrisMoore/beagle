import {TransactionsAdapter} from "./TransactionsAdapter"

const {signIn,
    createTransaction,
    getTransactionsByStatus} = TransactionsAdapter()

const EMAIL = 'tmptx@gmail.com'
const PASSWORD = 'abcd1234'
const CUSTOMER_A = "98a45f79-2caa-43b7-bee4-268d6e7f75a6"

describe('TransactionAdapter', function() {

    let txFundsAddPendingApproval = {}
    let txFundsAddApproved = {}
    let txFundsAddFinal = {}
    let txInvoicePendingApproval = {}
    let txInvoiceApproved = {}
    let txInvoiceFinal = {}
    

    it('logs in as dev', async () => {
        let [user] = await signIn(EMAIL, PASSWORD);
        expect(user.email).toBe(EMAIL)
    });
    
    it('creates new INVOCIE PENDING_APPROVAL', async () => {
        let tx = {
            user_id: CUSTOMER_A,
            amount: 5.00,
            account_number: CUSTOMER_A,
            type: "INVOICE"
        }

        txInvoicePendingApproval = await createTransaction(tx, 'PENDING_APPROVAL')
        expect(txInvoicePendingApproval.inserted_at).not.toBeNull()
    });

    it('creates new FUNDS_ADD PENDING_APPROVAL', async () => {
        let tx = {
            user_id: CUSTOMER_A,
            amount: 5.00,
            account_number: CUSTOMER_A,
            type: "FUNDS_ADD"
        }

        txFundsAddPendingApproval = await createTransaction(tx, 'PENDING_APPROVAL')
        expect(txFundsAddPendingApproval.inserted_at).not.toBeNull()
    });

    it('finds prior tx in pending tx list', async () => {

        let pendingApprovalTxs = await getTransactionsByStatus('PENDING_APPROVAL')
        
        expect(pendingApprovalTxs).toContainEqual( // Compare values only.
            txInvoicePendingApproval
        );
        expect(pendingApprovalTxs).toContainEqual( // Compare values only.
            txFundsAddPendingApproval
        );
    });

    it('creates existing FUNDS_ADD APPROVED', async () => {

        txFundsAddApproved = await createTransaction(txFundsAddPendingApproval, 'APPROVED')
        expect(txFundsAddApproved.inserted_at).not.toBeNull()
    });

    it('creates existing INVOICE APPROVED', async () => {

        txInvoiceApproved = await createTransaction(txInvoicePendingApproval, 'APPROVED')
        expect(txInvoiceApproved.inserted_at).not.toBeNull()
    });
    
    it('throws error if existing FUNDS_ADD submitted for APPROVED', async () => {
        
        await expect(createTransaction(txFundsAddPendingApproval, 'APPROVED')).rejects.toEqual(
            new Error('validateTransactionState - invalid tx state')
          );

    });

    it('creates existing FUNDS_ADD FINAL', async () => {

        txFundsAddFinal = await createTransaction(txFundsAddApproved, 'FINAL')
        expect(txFundsAddFinal.inserted_at).not.toBeNull()
    });

    it('creates existing INVOICE FINAL', async () => {

        txInvoiceFinal = await createTransaction(txInvoiceApproved, 'FINAL')
        expect(txInvoiceFinal.inserted_at).not.toBeNull()
        expect(txInvoiceFinal.amount).toBeLessThan(0)
    });

    it('throws error, if a FINAL tx is submitted as new', async () => {

        await expect(createTransaction(txFundsAddFinal, 'PENDING_APPROVAL')).rejects.toEqual(
            new Error('tx uuid exists on PENDING_APPROVAL')
        );
    });

    it('throws error, if a FINAL tx is submitted as APPROVED', async () => {

        await expect(createTransaction(txFundsAddFinal, 'APPROVED')).rejects.toEqual(
            new Error('validateTransactionState - invalid tx state')
        );
    });
    

});

