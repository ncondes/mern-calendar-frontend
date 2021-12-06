import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import '@testing-library/jest-dom';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventStartUpdate, eventClearActiveEvent, eventStartAddNew } from '../../../actions/event';
import { DateTimePicker } from 'react-datetime-picker';
import { act } from 'react-dom/test-utils';
import Swal from 'sweetalert2';


// mock a la funcion
jest.mock('../../../actions/event', () => ({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn(),
}))

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

// Storage.prototype.setItem = jest.fn();

// config store
const middlewares = [ thunk];
const mockStore = configureStore( middlewares );

const now = moment().minutes(0).seconds(0).add(1,'hours');
const nowPlusOne = now.clone().add(1,'hours');

const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hola mundo',
            notes: 'Some notes',
            start: now.toDate(),
            end: nowPlusOne.toDate(),
        }
    },
    ui: {
        modalOpen: true,
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
        <CalendarModal />
    </Provider>
)


describe('Pruebas en CalendarModal', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('Debe de mostrar el modal', () => {
        
        expect( wrapper.find('.modal').exists() ).toBe( true );
        expect( wrapper.find('Modal').prop('isOpen') ).toBe( true );

    })

    test('Debe de llamar la accion de actualizar y cerrar el modal', () => {
        
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( eventStartUpdate ).toHaveBeenCalledWith( initState.calendar.activeEvent );
        expect( eventClearActiveEvent ).toHaveBeenCalled();

    })

    test('Debe de mostrar error si falta el titulo', () => {
        
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe( true );

    })

    test('Debe de crear un nuevo evento', () => {
        
        const initState = {
            calendar: {
                events: [],
                activeEvent: null,
            },
            ui: {
                modalOpen: true,
            },
            auth: {
                name: 'Fernando',
                uid: '123',

            }
        };
        let store = mockStore( initState );
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={ store }>
                <CalendarModal />
            </Provider>
        )

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola Pruebas',
            }
        })

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( eventStartAddNew ).toHaveBeenLastCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            title: 'Hola Pruebas',
            notes: '',
        });

        expect( eventClearActiveEvent ).toHaveBeenCalled();

    })

    test('Debe de validar las fechas', () => {
        
        
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola Pruebas',
            }
        });

        const today = new Date();

        act( () => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(today)
        })

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( Swal.fire ).toHaveBeenCalledWith({
            "icon": "error", "text": "The end date must be greater than the start date", "title": "Error"
        });

    })

})