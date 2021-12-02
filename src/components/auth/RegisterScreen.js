import { Link } from 'react-router-dom';
import './RegisterScreen.css';

export const RegisterScreen = () => {
    return (
        <div className='register__container'>
            <form className=''>
                <h2 className='mb-5'>Sign Up</h2>
                <div className='mb-3'>
                    <input
                        type="text"
                        className='form-control'
                        placeholder='Name'
                    />
                </div>
                <div className='mb-3'>
                    <input
                        type="email"
                        className='form-control'
                        placeholder='Email'
                    />
                </div>
                <div className='mb-3'>
                    <input
                        type="password"
                        className='form-control'
                        placeholder='Password'
                    />
                </div>
                <div class='mb-3'>
                    <input
                        type='password'
                        className='form-control'
                        placeholder='Confirm Password'
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
