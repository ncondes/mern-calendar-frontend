
import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';

describe('Pruebas en fetch', () => {

    let token = {};

    test('fetchWithoutToken debe funcionar', async () => {
        
        const resp = await fetchWithoutToken( 'auth', { email: 'Fernando@gmail.com', password: '123456'}, 'POST' );
        const body = await resp.json();

        expect( resp instanceof Response ).toBe( true );
        expect( body.ok ).toBe( true );
        
        token = body.token;

    });

    test('Fetch', async () => {
        
        localStorage.setItem( 'token', token );
        const resp = await fetchWithToken( 'events', {}, 'GET' );
        const body = await resp.json();

        expect( body.ok ).toBe( true );
        expect( typeof body.events).toBe( 'object' );

    })

})