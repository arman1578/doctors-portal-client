import React from 'react';

const ConfirmationModal = ({ title, message, closeModal, successAction, successButtonName, modalData }) => {
    return (
        <div>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl">{title}</h3>
                    <p className="py-4 text-xl text-left font-semibold">{message}</p>
                    <div className="modal-action">
                        <button onClick={() => successAction(modalData)} className="btn text-lg btn-error btn-outline">{successButtonName}</button>
                        <button onClick={closeModal} className="btn btn-outline btn-accent text-lg">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;