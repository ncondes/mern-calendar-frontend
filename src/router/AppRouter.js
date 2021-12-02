import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';


export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth )

    useEffect(() => {

        dispatch( startChecking() )

    }, [dispatch])

    if ( checking ) {
        return <h5>Loading ...</h5>
    }

    return (
        <>
            <BrowserRouter>
                <Routes>

                    <Route path='/login' element={
                        <PublicRoute isLoggedIn={ !!uid }>
                            <LoginScreen />
                        </PublicRoute>
                    } />

                    <Route path='/register' element={
                        <PublicRoute isLoggedIn={ !!uid }>
                            <RegisterScreen />
                        </PublicRoute>
                    }/>

                    <Route path='/' element={
                        <PrivateRoute isLoggedIn={ !!uid }>
                            <CalendarScreen />
                        </PrivateRoute>
                    } />

                    {/* <Route path='/login' element={ <LoginScreen /> }/>
                    <Route path='/register' element={ <RegisterScreen /> } />
                    <Route path='/' element={ <CalendarScreen /> }/>
                    <Route path='/*' element={ <CalendarScreen /> }/> */}

                </Routes>
            </BrowserRouter>
        </>
    )
}
