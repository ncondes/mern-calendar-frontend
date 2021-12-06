import moduleName from 'module';
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { AppRouter } from '../../router/AppRouter';



// config store
const middlewares = [ thunk];
const mockStore = configureStore( middlewares );

// mock store
// store.dispatch = jest.fn();

describe('Pruebas en AppRouter', () => {
    

    test('Debe de mostrar el espere', () => {

        const initState = {
            auth: {
                checking: true,
            }
        };

        
        let store = mockStore( initState );
        
        const wrapper = mount(
            <Provider store={ store }>
                <AppRouter />
            </Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h5').exists() ).toBe( true );

    })

    
    test('Debe de mostrar la ruta publica', () => {

        const initState = {
            auth: {
                checking: false,
                uid: null,
            }
        };

        const store = mockStore( initState );
        
        const wrapper = mount(
            <Provider store={ store }>
                <AppRouter />
            </Provider>
        );
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.login__container').exists() ).toBe( true );

    })

    test('Debe de mostrar la ruta privada', () => {

        const initState = {
            auth: {
                checking: false,
                uid: '123',
                name: 'carlangas'
            },
            ui: {
                modalOpen: false,
            },
            calendar: {
                events: [],
            },
        };

        const store = mockStore( initState );
        
        const wrapper = mount(
            <Provider store={ store }>
                <AppRouter />
            </Provider>
        );
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.calendar__screen').exists() ).toBe( true );

    })
    
}) 