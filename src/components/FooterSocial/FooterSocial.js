import './FooterSocial.css';
import gh from '../../images/github.svg';
import fb from '../../images/fb.svg';

function FooterSocial() {

    return (
        <div className='footer__social'>
            <a href="https://github.com/Rachel-Levin" target="_blank">
                <img className='footer__social_icon' src={gh} alt='github'></img>
            </a>
            <a href="https://www.facebook.com/kate.levine.98/" target="_blank">
                <img className='footer__social_icon' src={fb} alt='facebook'></img>
            </a>
        </div>
    );
};

export default FooterSocial;
