

export const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark mb-2">
            <div className="container-fluid">
                <span className="navbar-brand">Roberto</span>
                <button className ="btn btn-outline-light" type ="submit">
                    <i className='fas fa-sign-out-alt'></i>
                    <span className=''> Log out</span>
                </button>
            </div>
        </nav>
    )
}
