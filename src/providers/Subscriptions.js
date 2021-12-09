import { supabase } from '../supabase'

export const Subscriptions = () => {
    
    const CreateSubscription = async (req) => {
        
        const { data, error } = await supabase
            .from("subscriptions")
            .insert(req)
        if (error) console.log('error creating subscription : ', error.message)
        else if (data.length > 0) {
            console.log('created subscription: ', data)
            return data[0]
        } return null
    };

    return { 
        CreateSubscription
    }

};
