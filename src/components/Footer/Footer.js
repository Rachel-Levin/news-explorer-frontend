import './Footer.css';
import FooterCopyright from '../FooterCopyright/FooterCopyright';
import FooterNav from '../FooterNav/FooterNav';

function Footer() {

    return (
        <footer className='footer'>
            <div className='footer__conteiner'>
                <FooterCopyright />
                <FooterNav />
            </div>
        </footer>
    );
};

export default Footer;
