import './Login.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faKey, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal } from 'react-bootstrap'

function Login() {
    const [showImportSeedPhrase, setShowImportSeedPhrase] = useState(false)
    const handleCloseImportSeedPhrase = () => setShowImportSeedPhrase(false)
    const handleShowImportSeedPhrase = () => setShowImportSeedPhrase(true)
    const [showImportPrivateKey, setShowImportPrivateKey] = useState(false)
    const handleCloseImportPrivateKey = () => setShowImportPrivateKey(false)
    const handleShowImportPrivateKey = () => setShowImportPrivateKey(true)
    const [showPleaseWait, setShowPleaseWait] = useState(false)
    const handleClosePleaseWait = () => setShowPleaseWait(false)
    const handleShowPleaseWait = () => setShowPleaseWait(true)

    return (
        <div className="login h-100">
            <div className="container h-100">
                <div className="d-flex align-items-center justify-content-center flex-column h-100">
                    <h3 className="font-size-170 text-color-6 mb-2">BDB Crypto Wallet Project</h3>
                    <h3 className="font-size-120 text-color-7 mb-5">&copy; Markii and Bernie from Ownly, 2022</h3>
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="login-box text-center p-4">
                            <FontAwesomeIcon className="mb-3" icon={faPlus} color="#C8C8C8" size="5x" />
                            <p className="neo-bold text-color-7 mb-0 font-size-120 mb-2">Set up a new wallet</p>
                            <p className="text-color-7 mb-0 font-size-90 mb-4">This will create a new wallet and a 12-word seed phrase</p>
                            <button className="btn btn-custom-2 w-100" type="button">Create a Wallet</button>
                        </div>
                        <div className="login-box text-center p-4">
                            <FontAwesomeIcon className="mb-3" icon={faDownload} color="#C8C8C8" size="5x" />
                            <p className="neo-bold text-color-7 mb-0 font-size-120 mb-2">Add existing wallet</p>
                            <p className="text-color-7 mb-0 font-size-90 mb-4">Import your existing wallet using a 12-word seed phrase</p>
                            <button onClick={handleShowImportSeedPhrase} className="btn btn-custom-2 w-100" type="button">Import Wallet</button>
                        </div>
                        <div className="login-box text-center p-4">
                            <FontAwesomeIcon className="mb-3" icon={faKey} color="#C8C8C8" size="5x" />
                            <p className="neo-bold text-color-7 mb-0 font-size-120 mb-2">Add using private key</p>
                            <p className="text-color-7 mb-0 font-size-90 mb-4">Import your existing wallet using your own private key</p>
                            <button onClick={handleShowImportPrivateKey} className="btn btn-custom-2 w-100" type="button">Import Wallet</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for import seed phrase */}
            <Modal show={showImportSeedPhrase} onHide={handleCloseImportSeedPhrase} backdrop="static" keyboard={false} size="sm" centered>
                <Modal.Body>
                    <p className="font-size-130">Import Seed Phrase</p>
                    <textarea id="login-import-seedphrase" rows={5} className="form-control resize-none" placeholder="Enter 12-word seedphrase separated by space..."></textarea>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <button className="btn btn-custom-2" type="button">Import Wallet</button>
                    <Button className="neo-bold" variant="secondary" onClick={handleCloseImportSeedPhrase}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>   

            {/* Modal for import private key */}
            <Modal show={showImportPrivateKey} onHide={handleCloseImportPrivateKey} backdrop="static" keyboard={false} size="sm" centered>
                <Modal.Body>
                    <p className="font-size-130">Import Private Key</p>
                    <textarea id="login-import-private-key" rows={3} className="form-control resize-none" placeholder="Enter your private key..."></textarea>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <button className="btn btn-custom-2" type="button">Import Wallet</button>
                    <Button className="neo-bold" variant="secondary" onClick={handleCloseImportPrivateKey}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>   

            {/* Modal for waiting */}
            <Modal show={showPleaseWait} onHide={handleClosePleaseWait} backdrop="static" keyboard={false} size="sm" centered>
                <Modal.Body>
                    <div className="text-center mb-3">
                        <FontAwesomeIcon color="grey" size="6x" icon={faSpinner} spin />
                    </div>
                    <p className="app-loading-modal-content text-center font-size-140">Please wait...</p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button className="neo-bold" variant="secondary" onClick={handleClosePleaseWait}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> 
        </div>
    )
}

export default Login;
