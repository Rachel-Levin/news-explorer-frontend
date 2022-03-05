import './NavBtn.css';
import { useLocation } from 'react-router-dom';

function NavBtn(props) {
    const location = useLocation();
    const { isNavOpen } = props;

    return (
        <button 
        // className={`nav-btn nav-btn__dark ${isNavOpen ? 'nav-btn__close' : ''}`}
        className={`${
            location.pathname === "/"
              ? "nav-btn nav-btn__light"
              : "nav-btn nav-btn__dark"
          }
          ${isNavOpen ? 'nav-btn__close' : ''}
          `}
          onClick={props.onOpenNavClick}
        //   onClick={props.onSignInClick}
        >
        </button>
    );
};

export default NavBtn;
