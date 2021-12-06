import moduleName from 'module';
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin } from '../../../actions/auth';
import { MemoryRouter } from 'react-router';




// mock a la funcion
jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
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
            <LoginScreen />
        </Provider>
    </MemoryRouter>
)



describe('Pruebas en LoginScreen', () => {

    test('Debe mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    })

    test('Debe de llamar el dispatch del login', () => {
        
        wrapper.find('input[name="loginEmail"]').simulate('change', {
            target: {
                name: 'loginEmail',
                value: 'Juan@gmail.com'
            }
        })
        wrapper.find('input[name="loginPassword"]').simulate('change', {
            target: {
                name: 'loginPassword',
                value: '123456'
            }
        })

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        })

        expect( startLogin ).toHaveBeenCalledWith(  "Juan@gmail.com", "123456" );

    })
    
    
})