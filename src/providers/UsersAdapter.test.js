import {UsersAdapter} from "./UsersAdapter"

const {signIn,
        useGetUserByID,
        useGetUsers} = UsersAdapter()

const EMAIL = 'tmptx@gmail.com'
const PASSWORD = 'abcd1234'
const USER_UID = '2011e0bc-3021-42fa-8895-d767499ba244'

describe('UsersAdapter', function() {

    it('logs in as dev', async () => {
        let [user] = await signIn(EMAIL, PASSWORD);
        expect(user.email).toBe(EMAIL)
    });
    
    it('return user information, when search by ID', async () => {
        let user = await useGetUserByID(USER_UID)
        
        expect(user.email).toBe(EMAIL)

    });

    it('return all user information', async () => {
        let users = await useGetUsers()
        
        expect(users.length).toBeGreaterThan(0)

    });

});

