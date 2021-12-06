import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { types } from '../../../types/types';
import { eventSetActive, eventStartLoading } from '../../../actions/event';
import { act } from 'react-dom/test-utils';



// mock a la funcion
// jest.mock('../../../actions/event', () => ({
//     eventStartDelete: jest.fn(),
// }))

jest.mock('../../../actions/event', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn(),
}))

Storage.prototype.setItem = jest.fn();

// config store
const middlewares = [ thunk];
const mockStore = configureStore( middlewares );

const initState = {
    calendar: {
        events: [],
    },
    ui: {
        modalOpen: false,
    },
    auth: {
        name: 'Fernando',
        uid: '123',
        checking: false,
    }
};
let store = mockStore( initState );

// mock store
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <CalendarScreen />
    </Provider>
)


describe('Pruebas en CalendarScreen', () => {

    test('Debe de hacer match con el snaptshot', () => {

        expect( wrapper ).toMatchSnapshot();

    })

    test('Pruebas con las interacciones del calendario', () => {
        
        const calendar = wrapper.find('Calendar');

        calendar.prop('onDoubleClickEvent')();

        expect( store.dispatch ).toHaveBeenCalledWith({ type: types.uiOpenModal });

        calendar.prop('onSelectEvent')({ start: 'Hola' });
        
        expect( eventSetActive ).toHaveBeenCalledWith({ start: 'Hola'})

        act( () => {
            calendar.prop('onView')('week')
    
            expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastView', 'week' )
        })

    })

})