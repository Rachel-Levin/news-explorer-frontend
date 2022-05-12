import './Header.css';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import NavBtn from '../NavBtn/NavBtn';

function Header(props) {
  return (
    <section className={` ${props.isNavOpen ? 'header__opacity' : ''}`}>
        <header className={`header ${props.isNavOpen ? 'header__mobile' : ''}`}>
          <Logo 
            isNavOpen={props.isNavOpen}
          />
          <Navigation 
            onSignInClick={props.onSignInClick}
            onLogOutClick={props.onLogOutClick}
            isNavOpen={props.isNavOpen}
            onNavClose={props.onNavClose}
            loggedIn={props.loggedIn}

          />
          <NavBtn 
          onOpenNavClick={props.onOpenNavClick}
          // onSignInClick={props.onSignInClick}
          // onLogOutClick={props.onLogOutClick}
          isNavOpen={props.isNavOpen}
          />
        </header>
      </section>
  );
};
  
export default Header;
