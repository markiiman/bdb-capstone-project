import './SeedPhrase.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal } from 'react-bootstrap'
import { faChevronLeft, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

function EnterSeedPhrase() {
    const back = () => {
        window.location.href = "/seedphrase";
    }

    const [showSuccess, setShowSuccess] = useState(false)
    const handleCloseSuccess = () => setShowSuccess(false)
    const handleShowSuccess = () => setShowSuccess(true)
    const [showError, setShowError] = useState(false)
    const handleCloseError = () => setShowError(false)
    const handleShowError = () => setShowError(true)

    return (
        <div className="enter-seedphrase">
            <div className="container">
                <div onClick={back} className="d-flex pt-3 cursor-pointer">
                    <FontAwesomeIcon className="mb-3" icon={faChevronLeft} color="#333333" size="lg" />&nbsp;&nbsp;&nbsp;Back
                </div>

                <div className="enter-seedphrase-wrap d-flex align-items-center justify-content-center flex-column">
                    <h3 className="font-size-200 text-color-6 mb-3">Confirm your Secret Backup Phrase</h3>
                    <h3 className="font-size-120 text-color-7 mb-5">Please select each phrase in order to make sure it is correct.</h3>

                    <div className="enter-seedphrase-container">
                        <div className="d-flex flex-wrap justify-content-start align-items-start">
                            <div className="sp-item">collection</div>
                            <div className="sp-item">nft</div>
                            <div className="sp-item">blockchain</div>
                            <div className="sp-item">crypto</div>
                            <div className="sp-item">governance</div>
                            <div className="sp-item">token</div>
                            <div className="sp-item">own</div>
                            <div className="sp-item">rewards</div>
                            <div className="sp-item">mustachio</div>
                            <div className="sp-item">titans</div>
                            <div className="sp-item">genesis</div>
                            <div className="sp-item">block</div>
                        </div>
                    </div>

                    <div className="esp-wrap d-flex flex-wrap justify-content-start align-items-start mb-3">
                        <div className="cursor-pointer sp-item active">collection</div>
                        <div className="cursor-pointer sp-item">nft</div>
                        <div className="cursor-pointer sp-item">blockchain</div>
                        <div className="cursor-pointer sp-item">crypto</div>
                        <div className="cursor-pointer sp-item">governance</div>
                        <div className="cursor-pointer sp-item">token</div>
                        <div className="cursor-pointer sp-item">own</div>
                        <div className="cursor-pointer sp-item">rewards</div>
                        <div className="cursor-pointer sp-item">mustachio</div>
                        <div className="cursor-pointer sp-item">titans</div>
                        <div className="cursor-pointer sp-item">genesis</div>
                        <div className="cursor-pointer sp-item">block</div>
                    </div>

                    <button onClick={handleShowSuccess} className="sp-confirm btn btn-custom-2">CONFIRM</button>
                </div>
            </div>

            {/* Modal for successful seedphrase */}
            <Modal show={showSuccess} onHide={handleCloseSuccess} backdrop="static" keyboard={false} size="sm" centered>
                <Modal.Body>
                    <div className="text-center mb-3">
                        <FontAwesomeIcon color="green" size="6x" icon={faCheckCircle} />
                    </div>
                    <p className="text-center">Congratulations! Your account is now created.</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <button className="btn btn-custom-1 neo-bold" onClick={handleCloseSuccess} type="button">Close</button>
                </Modal.Footer>
            </Modal>  

            {/* Modal for unsuccessful seedphrase */}
            <Modal show={showError} onHide={handleCloseError} backdrop="static" keyboard={false} size="sm" centered>
                <Modal.Body>
                    <div className="text-center mb-3">
                        <FontAwesomeIcon color="yellow" size="6x" icon={faCheckCircle} />
                    </div>
                    <p className="text-center">Your seed phrase doesn't match the records. Please try again.</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <button className="btn btn-custom-1 neo-bold" onClick={handleCloseError} type="button">Close</button>
                </Modal.Footer>
            </Modal>  
        </div>
    )
}

export default EnterSeedPhrase