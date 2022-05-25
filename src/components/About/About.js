import './About.css';
import avater from '../../images/image-03-min.jpg'
import NewsCard from '../NewsCard/NewsCard';
import NewsCardListBtn from '../NewsCardListBtn/NewsCardListBtn';

function About() {

    return (
        <section className='about'>
            <img className='about__avatar' alt='avatar of the author' src={ avater } />
            <div className='about__description'>
                <h3 className='about__title'>About the author</h3>
                <p className='about__text'>          Hi! My name is Rachel Levin, A Yandex Full Stack Boot Camp
          student (at the final project stage) from Israel.</p>
                {/* <p className='about__text'>You can also talk about your experience with Practicum, what you learned there, and how you can help potential customers.</p> */}
            </div>
        </section>
    );
};

export default About;