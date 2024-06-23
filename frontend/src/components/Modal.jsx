import '../index.css';

const Modal = ({ children, titleModal }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3 className='modal-title'>{ titleModal }</h3>
                
                {children}
            </div>
        </div>
    );
}

export default Modal