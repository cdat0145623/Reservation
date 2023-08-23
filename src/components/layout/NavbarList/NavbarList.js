import Header from '~/pages/Header/Header';
import Navbar from '~/pages/Navbar/Navbar';

function NavbarList({ children }) {
    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default NavbarList;
