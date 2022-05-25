import './ErrMessage.css';

function ErrMessage() {
    return (
        <section className='err-message'>
            <p className='err-message__text'>Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.</p>
        </section>
    );
};

export default ErrMessage;