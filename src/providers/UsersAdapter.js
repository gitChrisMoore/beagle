import { supabase } from '../supabase'


export const UsersAdapter = () => {
    
    const signIn = async (email, password) => {
        const { user, session, error } = await supabase.auth.signIn({
            email: email,
            password: password
        })
        if (error) throw new Error('SubscriptionsAdapter - signIn - ', error);
        return [user, session]
    };

    const useGetUserByID = async (id) => {
        let {data, error} = await supabase
            .from("public_users")
            .select("*")
            .eq('id', id)
            .limit(1)
            .single();
        if (error) console.log('error - ', error)
        if(!data) console.log("useGetUserByID - no results found")
        return data
    };

    const useGetUsers = async () => {
        let {data, error} = await supabase
            .from("public_users")
            .select("*");
        if (error) console.log('error - ', error)
        if(!data) console.log("useGetUserByID - no results found")
        return data
    };

    const testGetUserByID = async (id) => {
        const [data] = await useGetUserByID(id);

        return (
            <div>{data.email}, {data.user_uid}</div>
        );
    };

    return { 
        useGetUserByID,
        useGetUsers,
        signIn
    }

};
