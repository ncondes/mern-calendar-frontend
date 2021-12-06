
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../../actions/event';



// mock a la funcion
jest.mock('../../../actions/event', () => ({
    eventStartDelete: jest.fn(),
}))


// config store
const middlewares = [ thunk];
const mockStore = configureStore( middlewares );

const initState = {};
let store = mockStore( initState );

// mock store
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <DeleteEventFab />
    </Provider>
)



describe('Pruebas en DeleteEventFab', () => {

    test('Debe de hacer match con el snapshot', () => {
        
        expect( wrapper ).toMatchSnapshot();

    });

    test('Debe de llamar el eventStartDelete al hacer click', () => {

        wrapper.find('.fab-danger').prop('onClick')();
        expect( eventStartDelete ).toHaveBeenCalled();

    })
    
    
}) 