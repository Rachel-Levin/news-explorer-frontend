
import './NothingFound.css';
import NF from '../../images/not-found_v1.svg'; 

function NothingFound() {
    return (
        <section className='nothing-found'>
            <img className='nothing-found__img' src={NF}></img>
            <h2 className='nothing-found__title' >Nothing found</h2>
            <p className='nothing-found__text'>Sorry, but nothing matched 
your search terms.</p>
        
        </section>
    );
};

export default NothingFound;