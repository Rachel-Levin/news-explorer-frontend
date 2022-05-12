import React from 'react';
import './Navigation.css';
import { Link, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Navigation(props) {

  const location = useLocation();
  const { onSignInClick } = props;
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <nav className=
      {`navigation
    ${props.isNavOpen ? 'navigation__mobile' : ''}
    `}
    >
      <Link to='/'
        className={`${location.pathname === "/"
          ? "navigation__link navigation__link-home"
          : "navigation__link navigation__home navigation__link-dark"
          }
          ${props.isNavOpen ? 'navigation__link_mobile' : ''}
          `}
        onClick={props.onNavClose}
      >Home</Link>
      <Link to='/saved-articles'
        className={`${location.pathname === "/"
          ? "navigation__link"
          : "navigation__link navigation__link-dark navigation__link-save"
          }
          ${props.isNavOpen ? 'navigation__link_mobile' : ''}
          `}
        onClick={props.onNavClose}
      >Saved articles</Link>
      {props.loggedIn ? (
        <button className={`${location.pathname === "/"
        ? "navigation__button"
        : "navigation__button navigation__button-dark"
        }
      ${props.isNavOpen ? 'navigation__button_mobile' : ''}
      `} onClick={props.onLogOutClick}>
          {/* log out */}
          {currentUser.name}
        </button>
      ) : (
        <button
          className={`${location.pathname === "/"
            ? "navigation__button"
            : "navigation__button navigation__button-dark"
            }
          ${props.isNavOpen ? 'navigation__button_mobile' : ''}
          `}
          onClick={props.onSignInClick} >{props.loggedIn ? currentUser.name : "Sign in"}</button>
      )}
      {/* <button
        className={`${location.pathname === "/"
          ? "navigation__button"
          : "navigation__button navigation__button-dark"
          }
          ${props.isNavOpen ? 'navigation__button_mobile' : ''}
          `}
        onClick={props.onSignInClick} >{props.loggedIn ? currentUser.name : "Sign in"}</button> */}
    </nav>
    //     <nav class="navigation">
    //     <ul>
    //       <li><a href="#">Home</a></li>
    //       <li><a href="#">Saved articles</a></li>
    //       <li><a href="#">Name</a></li>
    //     </ul>
    //   </nav>
  );
};

export default Navigation;
