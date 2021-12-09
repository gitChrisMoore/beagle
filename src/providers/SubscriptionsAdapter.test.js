import {SubscriptionsAdapter} from "./SubscriptionsAdapter"
import { TransactionsAdapter } from "./TransactionsAdapter"
const {signIn,
    CreateSubscription} = SubscriptionsAdapter()
const {getTransactionsByStatus} = TransactionsAdapter()

const EMAIL = 'tmptx@gmail.com'
const PASSWORD = 'abcd1234'

describe('SubscriptionsAdapter', function() {

    it('logs in as dev', async () => {
        let user = await signIn(EMAIL, PASSWORD);
        expect(user.email).toBe(EMAIL)
    });
    
    it('Lookup pending tx, create notification', async () => {
        let pendingApprovalTxs = await getTransactionsByStatus('PENDING_APPROVAL')
        let payload = {
            id: pendingApprovalTxs[0].id,
            user_id: pendingApprovalTxs[0].user_id
        }
        let newNotification = await CreateSubscription(payload)
        expect(newNotification.inserted_at).not.toBeNull()
    });

});

