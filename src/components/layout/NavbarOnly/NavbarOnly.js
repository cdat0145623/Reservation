import Navbar from '~/pages/Navbar/Navbar';

function NavbarOnly({ children }) {
    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default NavbarOnly;
