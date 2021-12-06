import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { startLogin, startRegister, startChecking } from '../../actions/auth';
import { types } from '../../types/types';
import Swal from 'sweetalert2';
import * as fetchModule from '../../helpers/fetch';



// mock sweetalert2
jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}))

// config store
const middlewares = [ thunk];
const mockStore = configureStore( middlewares );

const initState = {};
let store = mockStore( initState );


Storage.prototype.setItem = jest.fn();

let token = '';

describe('Pruebas en las acciones del auth', () => {

    beforeEach( () => {
        store = mockStore( initState );
        jest.clearAllMocks();
    })

    test('startLogin debe funcionar con un login valido', async () => {
        
        await store.dispatch( startLogin( 'Fernando@gmail.com', '123456' ) );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String),
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', expect.any(String) );
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token-init-date', expect.any(Number) );

        token = localStorage.setItem.mock.calls[0][1];

    });

    test('startLogin no debe de funcionar con un login incorrecto', async () => {
        
        await store.dispatch( startLogin( 'Fernando@gmail.com', 'esta contrasena no es' ) );

        const actions = store.getActions();

        expect( actions ).toEqual( [] );
        expect( Swal.fire ).toHaveBeenCalledWith( "Error", "Invalid password", "error" );

    });

    test('startRegister correcto', async () => {

        fetchModule.fetchWithoutToken = jest.fn( () => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'ABC123',
                }
            }
        }));
        
        await store.dispatch( startRegister( 'test', 'test@test.com', '123456' ) );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carlos',
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', 'ABC123' );
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token-init-date', expect.any(Number) );

    });

    test('startChecking correcto', async () => {

        fetchModule.fetchWithToken = jest.fn( () => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'ABC123',
                }
            }
        }));
        
        await store.dispatch( startChecking() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carlos',
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', 'ABC123' );
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token-init-date', expect.any(Number) );

    })

})