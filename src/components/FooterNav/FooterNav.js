import './FooterNav.css';
import FooterLinks from '../FooterLinks/FooterLinks';
import FooterSocial from '../FooterSocial/FooterSocial';

function FooterNav() {

    return (
        <div className='footer-nav'>
            <FooterLinks />
            <FooterSocial />
        </div>
    );
};

export default FooterNav;
