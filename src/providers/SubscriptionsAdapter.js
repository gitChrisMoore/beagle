import { supabase } from '../supabase'

export const SubscriptionsAdapter = () => {
    
    const signIn = async (email, password) => {
        const { user, session, error } = await supabase.auth.signIn({
            email: email,
            password: password
        })
        if (error) throw new Error('SubscriptionsAdapter - signIn - ', error);
        return [user, session]
    };
    
    const CreateSubscription = async (req) => {
        
        let jsonObject = {
            action: "TRANSACTION",
            detail: {
                "id": req.id,
                "user_id": req.user_id,
            }
        }
        let requestPaylod = {
            user_id: req.user_id,
            payload: JSON.stringify(jsonObject)
        }
        
        const { data, error } = await supabase
            .from("subscriptions")
            .insert(requestPaylod)
        if (error) console.log('error creating subscription : ', error.message)
        else if (data.length > 0) {
            return data[0]
        } return null
    };

    return { 
        CreateSubscription,
        signIn
    }

};
