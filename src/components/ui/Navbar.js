import { useDispatch, useSelector } from "react-redux"
import { startLogout } from "../../actions/auth";


export const Navbar = () => {

    const { name } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch( startLogout() );
    }

    return (
        <nav className="navbar navbar-dark bg-dark mb-2">
            <div className="container-fluid">
                <span className="navbar-brand">{ name }</span>
                <button
                    className ="btn btn-outline-light"
                    type ="submit"
                    onClick={ handleLogout }
                >
                    <i className='fas fa-sign-out-alt'></i>
                    <span className=''> Log out</span>
                </button>
            </div>
        </nav>
    )
}
