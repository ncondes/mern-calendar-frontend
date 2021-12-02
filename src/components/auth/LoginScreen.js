import { Link } from 'react-router-dom';
import './LoginScreen.css';

export const LoginScreen = () => {
    return (
        <div className='login__container'>
            <form className=''>
                <h2 className='mb-5'>Login</h2>
                <div className='mb-3'>
                    <input
                        type="email"
                        className='form-control'
                        placeholder='Email'
                    />
                </div>
                <div class='mb-3'>
                    <input
                        type='password'
                        className='form-control'
                        placeholder='Password'
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
