import { Link } from 'react-router-dom';
import './RegisterScreen.css';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startRegister } from '../../actions/auth';

export const RegisterScreen = () => {
    
    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        registerName: 'Alfonso',
        registerEmail: 'Alfonso@gmail.com',
        registerPassword1: '123456',
        registerPassword2: '123456',
    });

    const { registerName, registerEmail, registerPassword1, registerPassword2 } = formRegisterValues;

    const dispatch = useDispatch();

    const handleRegister = ( e ) => {
        e.preventDefault();
        if ( registerPassword1 !== registerPassword2 ) {
            return Swal.fire('Error', 'Passwords should match', 'error')
        }
        dispatch( startRegister( registerName, registerEmail, registerPassword1 ) );
    }

    return (
        <div className='register__container'>
            <form
                className=''
                onSubmit={ handleRegister }
            >
                <h2 className='mb-5'>Sign Up</h2>
                <div className='mb-3'>
                    <input
                        type="text"
                        className='form-control'
                        placeholder='Name'
                        name='registerName'
                        value={ registerName }
                        onChange={ handleRegisterInputChange }
                    />
                </div>
                <div className='mb-3'>
                    <input
                        type="email"
                        className='form-control'
                        placeholder='Email'
                        name='registerEmail'
                        value={ registerEmail }
                        onChange={ handleRegisterInputChange }
                    />
                </div>
                <div className='mb-3'>
                    <input
                        type="password"
                        className='form-control'
                        placeholder='Password'
                        name='registerPassword1'
                        value={ registerPassword1 }
                        onChange={ handleRegisterInputChange }
                    />
                </div>
                <div className='mb-3'>
                    <input
                        type='password'
                        className='form-control'
                        placeholder='Confirm Password'
                        name='registerPassword2'
                        value={ registerPassword2 }
                        onChange={ handleRegisterInputChange }
                    />
                </div>
                <div className='register__links'>
                    <button
                        type='submit'
                        className='btn btn-light'
                    >
                        Sign up
                    </button>
                    <Link to='/login'>Have an account yet?</Link>
                </div>
            </form>
        </div>
    )
}
