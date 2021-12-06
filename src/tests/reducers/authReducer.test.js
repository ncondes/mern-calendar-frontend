
import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';
import { startChecking } from '../../actions/auth';

const initState = {
    checking: true, 
    // uid: null, 
    // name: null,
}


describe('Pruebas en authReducer', () => {

    test('Debe de retornar el estado por defecto', () => {
        
        const state = authReducer( initState, {} );

        expect( state ).toEqual({
            checking: true, 
        })

    })

    test('Debe de funcionar el authLogin', () => {
        
        const action = {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carlitos',
            }
        }

        const state = authReducer( initState, action )

        expect( state ).toEqual({
            checking: false,
            uid: '123',
            name: 'carlitos',
        })

    });

    test('Debe de funcionar el authCheckingFinish', () => {
        
        const action = {
            type: types.authCheckingFinish,
        }

        const state = authReducer( initState, action )

        expect( state ).toEqual({
            checking: false,
        })
    })

    test('Debe de funcionar el authLogout', () => {

        const loginAction = {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carlitos',
            }
        }

        let state = authReducer( initState, loginAction );
        
        const logoutAction = {
            type: types.authLogout,
        }

        state = authReducer( initState, logoutAction )

        expect( state ).toEqual({
            checking: false,
        })
    })
    
    
    

})