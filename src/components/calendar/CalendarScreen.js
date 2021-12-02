import moment from 'moment';
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { CalendarEvent } from './CalendarEvent';
import { Navbar } from "../ui/Navbar";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { eventSetActive, eventClearActiveEvent, eventStartLoading } from '../../actions/event';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

const localizer = momentLocalizer(moment);

// const events = [{
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add( 1, 'hours' ).toDate(),
//     bgcolor: '#fafa',
//     notes: 'Comprar el pastel',
//     user: {
//         _id: '123',
//         name: 'Fernando'
//     },
// }]

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );
    const { uid } = useSelector( state => state.auth );

    const [ lastView, setlastView ] = useState( localStorage.getItem( 'lastView' ) || 'month' )


    useEffect(() => {

        dispatch( eventStartLoading() );

    }, [dispatch])


    const onDoubleClick = ( e ) => {
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = ( e ) => {
        dispatch( eventSetActive( e ) );
    }

    const onViewChange = ( e ) => {
        setlastView( e )
        localStorage.setItem( 'lastView', e );
    }

    // TODO: al seleccionar una casilla vacia poder crear un nuevo evento
    const onSelectSlot = ( e ) => {
        dispatch( eventClearActiveEvent() );
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#767CF7' : '#765660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: '#FFFFFF'
        }
        return {
            style
        }
    };

    return (
        <div className='calendar__screen'>
            <Navbar />

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />
            {
                activeEvent && <DeleteEventFab />
            }
            <CalendarModal />

        </div>
    )
}
