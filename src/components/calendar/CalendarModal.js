import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/event';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours');
const nowPlusOne = now.clone().add(1,'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlusOne.toDate(),
};

export const CalendarModal = () => {

    const dispatch = useDispatch();

    const { modalOpen } = useSelector( state => state.ui );
    const { activeEvent } = useSelector( state => state.calendar );

    const [ dateStart, setDateStart ] = useState( now.toDate() );
    const [ dateEnd, setDateEnd ] = useState( nowPlusOne.toDate() );
    const [ validTitle, setValidTitle ] = useState( true )

    const [ formValues, setFormValues ] = useState( initEvent );

    const { title, notes, start, end } = formValues;

    useEffect(() => {
        if ( activeEvent ) {
            setFormValues( activeEvent );
        } else {
            setFormValues( initEvent );
        }
    }, [ activeEvent, setFormValues ])

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [ target.name ]: target.value,
        });
    }

    const closeModal = () => {
        dispatch( uiCloseModal() );
        dispatch( eventClearActiveEvent() );
        setFormValues( initEvent );
    }

    const handleStartDateChange = ( e ) => {
        setDateStart( e );
        setFormValues({
            ...formValues,
            start: e,
        });
    }

    const handleEndDateChange = ( e ) => {
        setDateEnd( e );
        setFormValues({
            ...formValues,
            end: e,
        });
    }

    const handleSubmitForm = ( e ) => {
        e.preventDefault();

        const momentStart = moment( start );
        const momentEnd = moment( end );

        if ( momentStart.isSameOrAfter( momentEnd )) {
            return Swal.fire({
                title: 'Error',
                text: 'The end date must be greater than the start date',
                icon: 'error',
            });
        }

        if ( title.trim().length < 1 ) {
            return setValidTitle( false );
        }

        if ( activeEvent ) {
            dispatch( eventStartUpdate( formValues ) );
        } else {
            dispatch( eventStartAddNew( formValues ) );
        }

        setValidTitle( true );
        closeModal();
    }

    return (
        <Modal
            isOpen={ modalOpen }
            // onAfterOpen={ afterOpenModal }
            onRequestClose={ closeModal }
            style={ customStyles }
            closeTimeoutMS={ 200 }
            className='modal'
            overlayClassName='modal-bg'
        >
            <h1>{ (activeEvent) ? 'Edit Event' : 'New Event' }</h1>
            <hr />
            <form
                className="container"
                onSubmit={ handleSubmitForm }
            >

                <div className="form-group">
                    <label>Start time and date</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ dateStart }
                        className='form-control'
                    />
                </div>
                <br />
                <div className="form-group">
                    <label>End time and date</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ dateEnd }
                        minDate={ dateStart }
                        className='form-control'
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Title and notes</label>
                    <input
                        type="text"
                        className={ `form-control ${ !validTitle && 'is-invalid' }` }
                        placeholder="Event title"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">A short description</small>
                </div>
                <br />
                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Additional information</small>
                </div>
                <br />
                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>

            </form>
        </Modal>
    )
}
