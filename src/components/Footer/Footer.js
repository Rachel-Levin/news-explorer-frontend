import './Footer.css';
import FooterCopyright from '../FooterCopyright/FooterCopyright';
import FooterNav from '../FooterNav/FooterNav';

function Footer() {

    return (
        <section className='footer'>
            <div className='footer__conteiner'>
                <FooterCopyright />
                <FooterNav />
            </div>
        </section>
    );
};

export default Footer;
