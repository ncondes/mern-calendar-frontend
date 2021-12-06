import moduleName from 'module';
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { startRegister } from '../../../actions/auth';
import { MemoryRouter } from 'react-router';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import Swal from 'sweetalert2';


// mock a la funcion
jest.mock('../../../actions/auth', () => ({
    startRegister: jest.fn(),
}))

// mock al sweealert2
jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}))

// config store
const middlewares = [ thunk];
const mockStore = configureStore( middlewares );

const initState = {};
let store = mockStore( initState );

// mock store
store.dispatch = jest.fn();

const wrapper = mount(
    <MemoryRouter>
        <Provider store={ store }>
            <RegisterScreen />
        </Provider>
    </MemoryRouter>
)


describe('Pruebas en RegisterScreen', () => {

    test('No hay registro si las contraseñas son diferentes', () => {

        wrapper.find('input[name="registerName"]').simulate('change', {
            target: {
                name: 'registerName',
                value: 'Robert'
            }
        })

        wrapper.find('input[name="registerEmail"]').simulate('change', {
            target: {
                name: 'registerEmail',
                value: 'Robert@gmail.com'
            }
        })
        
        wrapper.find('input[name="registerPassword1"]').simulate('change', {
            target: {
                name: 'registerPassword1',
                value: '123456-diferente'
            }
        })

        wrapper.find('input[name="registerPassword2"]').simulate('change', {
            target: {
                name: 'registerPassword2',
                value: '123456'
            }
        })

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        })

        expect( startRegister ).not.toHaveBeenCalled();
        expect( Swal.fire ).toHaveBeenCalledWith( "Error", "Passwords should match", "error" );

    });

    test('Debe de dispararse el registro con contraseñas iguales', () => {
        
        wrapper.find('input[name="registerName"]').simulate('change', {
            target: {
                name: 'registerName',
                value: 'Robert'
            }
        })

        wrapper.find('input[name="registerEmail"]').simulate('change', {
            target: {
                name: 'registerEmail',
                value: 'Robert@gmail.com'
            }
        })
        
        wrapper.find('input[name="registerPassword1"]').simulate('change', {
            target: {
                name: 'registerPassword1',
                value: '123456'
            }
        })

        wrapper.find('input[name="registerPassword2"]').simulate('change', {
            target: {
                name: 'registerPassword2',
                value: '123456'
            }
        })

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        })

        expect( startRegister ).toHaveBeenCalledWith(  "Robert", "Robert@gmail.com", "123456" );
        expect( Swal.fire ).not.toHaveBeenCalled();

    })
    
    
})