import { Link } from 'react-router-dom';
import './LoginScreen.css';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';

export const LoginScreen = () => {

    const [ formLoginValues, handleLoginInputChange ] = useForm({
        loginEmail: 'Fernando@gmail.com',
        loginPassword: '123456',
    });

    const { loginEmail, loginPassword } = formLoginValues;

    const dispatch = useDispatch();

    const handleLogin = ( e ) => {
        e.preventDefault();
        dispatch( startLogin( loginEmail, loginPassword ) );
    }

    return (
        <div className='login__container'>
            <form
                className=''
                onSubmit={ handleLogin }
            >
                <h2 className='mb-5'>Login</h2>
                <div className='mb-3'>
                    <input
                        type="email"
                        className='form-control'
                        placeholder='Email'
                        name='loginEmail'
                        value={ loginEmail }
                        onChange={ handleLoginInputChange }
                    />
                </div>
                <div className='mb-3'>
                    <input
                        type='password'
                        className='form-control'
                        placeholder='Password'
                        name='loginPassword'
                        value={ loginPassword }
                        onChange={ handleLoginInputChange }
                    />
                </div>
                <div className='login__links'>
                    <button
                        type='submit'
                        className='btn btn-primary'
                    >
                        Login
                    </button>
                    <Link to='/register'>Create a new account</Link>
                </div>
            </form>
        </div>
    )
}
