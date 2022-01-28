import './Home.css'
import ethereum from '../../img/eth_logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faUpload } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react'

function Home() {
    const [showImportToken, setShowImportToken] = useState(false)
    const handleCloseImportToken = () => setShowImportToken(false)
    const handleShowImportToken = () => setShowImportToken(true)

    return (
        <div className="home">
            <div className="container">
                <div className="home-container">
                    <div className="home-address d-flex justify-content-between align-items-center mb-3">
                        <p className="neo-bold text-color-6 font-size-110 p-4 mb-0">BDB Crypto Wallet Project</p>
                        <p className="neo-bold text-color-7 font-size-110 p-4 mb-0">0xabcdef123456abcdef123456abcdef123456</p>
                    </div>
                    <div className="home-acct">
                        <div className="text-center">
                            <div className="w-1/12 mx-auto mb-0">
                                <img src={ethereum} classname="w-100" alt="Ethereum Logo" />
                            </div>
                            <p className="neo-bold text-color-6 font-size-200 mb-4">0 rETH</p>
                        </div>
                    </div>
                    <div className="home-btns-group">
                        <div className="d-flex justify-content-center">
                            <div className="home-btn cursor-pointer">
                                <div className="home-btn-icon mb-2">
                                    <FontAwesomeIcon icon={faUpload} size="2x" color="#ffffff" />
                                </div>
                                <p className="neo-light text-center text-color-3 font-size-90 mb-0">Send</p>
                            </div>
                            <div className="home-btn cursor-pointer">
                                <div className="home-btn-icon mb-2">
                                    <FontAwesomeIcon icon={faDownload} size="2x" color="#ffffff" />
                                </div>
                                <p className="neo-light text-center text-color-3 font-size-90 mb-0">Receive</p>
                            </div>
                        </div>
                    </div>
                    <div className="home-tokens">
                        <div className="home-token-item d-flex align-items-center justify-content-start">
                            <div className="token-img mb-0">
                                <img src={ethereum} classname="w-100" alt="Ethereum Logo" />
                            </div>
                            <p className="text-color-6 font-size-130 mb-0">0 rETH</p>
                        </div>
                        <div className="home-token-item d-flex align-items-center justify-content-start">
                            <div className="token-img mb-0">
                                <img src={ethereum} classname="w-100" alt="Ethereum Logo" />
                            </div>
                            <p className="text-color-6 font-size-130 mb-0">0 rETH</p>
                        </div>
                    </div>
                    <div className="home-add-tokens text-center">
                        <button onClick={handleShowImportToken} type="button" className="btn btn-custom-5">Add Token</button>
                    </div>
                </div>
            </div>

            {/* Modal for import token */}
            <Modal show={showImportToken} onHide={handleCloseImportToken} backdrop="static" keyboard={false} size="lg" centered>
                <Modal.Body>
                    <p className="font-size-130 text-center mb-3">Import Token</p>
                    <div class="form-group mb-3">
                        <label className="font-size-90 text-color-7 mb-2" for="token-contract">Token Contract Address</label>
                        <input type="text" class="form-control" id="token-contract" autoFocus />
                    </div>
                    <div class="form-group mb-3">
                        <label className="font-size-90 text-color-7 mb-2" for="token-symbol">Token Symbol</label>
                        <input type="text" class="form-control" id="token-symbol" />
                    </div>
                    <div class="form-group mb-3">
                        <label className="font-size-90 text-color-7 mb-2" for="token-decimal">Token Decimal</label>
                        <input type="number" class="form-control" id="token-decimal" value="0" min="0" />
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <button className="btn btn-custom-2" type="button">Import Token</button>
                    <Button className="neo-bold" variant="secondary" onClick={handleCloseImportToken}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>  
        </div>
    )
}

export default Home