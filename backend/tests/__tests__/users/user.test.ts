import { ErrorStatus } from "../../generated/types/graphql"
import { useClient } from "../fixtures"
import { createError } from "../utils"
import { signIn } from "./requests"


describe('User Test', () => {
    const client = useClient()

    it('Should run test', async () => {
       const response = await signIn(client, { input: { email:'soft@test.com', password: 'admin'}}, '')

       if(response.signIn.__typename === 'AuthUser'){
        expect(response.signIn.user.email).toBe('soft@test.com')
       }

       if(response.signIn.__typename === 'BaseError'){
            throw createError(response)
       }
    })
})