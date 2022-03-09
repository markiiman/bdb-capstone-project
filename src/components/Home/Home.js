import './Home.css'
import ethereum from '../../img/eth_logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faUpload } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react'

// contract
import { tokenAbi, tokenAddress } from '../../contracts/odoToken'

function Home(props) {
    const provider = props.provider
    const ethers = props.ethers

    const [state, setState] = useState({
        copyToClipboard: false,
        signer: [],
        privateKey: "", // for project purposes only
        ethBalance: 0, // for project purposes only
        address: "",
        sendSelectedToken: "",
        sendTokenAmount: "",
    })

    // state updater
    const _setState = (name, value) => {
        setState(prevState => ({...prevState, [name]: value}))
    }

    const copyClipboard = () => {
        var obj = document.getElementById("address").select()
        document.execCommand('copy')
        _setState("copyToClipboard", true)
    }

    const sendToken = () => {
        var token = document.getElementById("token").value;
        var recipient = document.getElementById("recipient").value;
        var amount = ethers.utils.parseEther(document.getElementById("amount").value);

        console.log(token);
        console.log(recipient);
        console.log(amount);
        console.log(provider);
        console.log(state.privateKey);

        let wallet = new ethers.Wallet(state.privateKey, provider);
        let tx = {
            to: recipient,
            value: amount
        }
        wallet.sendTransaction(tx)
            .then((txObj) => {
                console.log('txHash', txObj.hash)
            })
    }

    useEffect(() => {
        if (localStorage.getItem('add') !== null) { // wallet address is created
            _setState("signer", JSON.parse(localStorage.getItem('signer')))
            _setState("privateKey", localStorage.getItem('pk'))
            _setState("address", localStorage.getItem('add'))

            async function getEthBalance() {
                let ethBalance = ethers.utils.formatEther(await provider.getBalance(localStorage.getItem('add')));
                _setState("ethBalance", ethBalance)
            }

            getEthBalance();
        } else { // no wallet address created yet
            window.location.href="/login"
        }
        // insert web3 functions here

    }, [])

    useEffect(() => {
        if (state.copyToClipboard) {
            setTimeout(() => {
                _setState("copyToClipboard", false)
            }, 3000)
        }
    }, [state.copyToClipboard])

    const [showImportToken, setShowImportToken] = useState(false)
    const handleCloseImportToken = () => setShowImportToken(false)
    const handleShowImportToken = () => setShowImportToken(true)
    const [showSend, setShowSend] = useState(false)
    const handleCloseSend = () => setShowSend(false)
    const handleShowSend = () => setShowSend(true)
    const [showReceive, setShowReceive] = useState(false)
    const handleCloseReceive = () => setShowReceive(false)
    const handleShowReceive = () => setShowReceive(true)

    return (
        <div className="home">
            <div className="container">
                <div className="home-container">
                    <div className="home-address d-flex justify-content-between align-items-center mb-3">
                        <p className="neo-bold text-color-6 font-size-110 p-4 mb-0">BDB Crypto Wallet Project</p>
                        <p className="neo-bold text-color-7 font-size-110 p-4 mb-0">{state.address}</p>
                    </div>
                    <div className="home-acct">
                        <div className="text-center">
                            <div className="w-1/12 mx-auto mb-0">
                                <img src={ethereum} className="w-100" alt="Ethereum Logo" />
                            </div>
                            <p className="neo-bold text-color-6 font-size-200 mb-4">{ state.ethBalance } rETH</p>
                        </div>
                    </div>
                    <div className="home-btns-group">
                        <div className="d-flex justify-content-center">
                            <div onClick={handleShowSend} className="home-btn cursor-pointer">
                                <div className="home-btn-icon mb-2">
                                    <FontAwesomeIcon icon={faUpload} size="2x" color="#ffffff" />
                                </div>
                                <p className="neo-light text-center text-color-3 font-size-90 mb-0">Send</p>
                            </div>
                            <div onClick={handleShowReceive} className="home-btn cursor-pointer">
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
                                <img src={ethereum} className="w-100" alt="Ethereum Logo" />
                            </div>
                            <p className="text-color-6 font-size-130 mb-0">{ state.ethBalance } rETH</p>
                        </div>
                        <div className="home-token-item d-flex align-items-center justify-content-start">
                            <div className="token-img mb-0">
                                <img src={ethereum} className="w-100" alt="Ethereum Logo" />
                            </div>
                            <p className="text-color-6 font-size-130 mb-0">0 ODO</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for send */}
            <Modal show={showSend} onHide={handleCloseSend} backdrop="static" keyboard={false} size="lg" centered>
                <Modal.Body>
                    <p className="font-size-130 text-center mb-3">Send Token</p>
                    <div className="form-group mb-3">
                        <label className="font-size-90 text-color-7 mb-2" for="token">Token</label>
                        <select className="form-control" id="token">
                            <option value="ETH">rETH</option>
                            <option value="ODO">ODO</option>
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <label className="font-size-90 text-color-7 mb-2" for="recipient">Recipient</label>
                        <input type="text" className="form-control" id="recipient"/>
                    </div>
                    <div className="form-group mb-3">
                        <label className="font-size-90 text-color-7 mb-2" for="amount">Amount</label>
                        <input type="number" min="0.00" step="0.01" className="form-control" id="amount" />
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <button className="btn btn-custom-2" type="button" onClick={sendToken}>Send</button>
                    <Button className="neo-bold" variant="secondary" onClick={handleCloseSend}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>  

            {/* Modal for receive */}
            <Modal show={showReceive} onHide={handleCloseReceive} backdrop="static" keyboard={false} size="lg" centered>
                <Modal.Body>
                    <p className="font-size-130 text-center mb-3">Receive Token</p>
                    <div className="form-group mb-3">
                        <label className="font-size-90 text-color-7 mb-2" for="address">Address</label>
                        <input type="text" className="form-control" readOnly id="address" value={state.address} />
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <button onClick={copyClipboard} className="btn btn-custom-2" type="button">
                        {state.copyToClipboard ? "Copied!" : "Copy to Clipboard" }
                    </button>
                    <Button className="neo-bold" variant="secondary" onClick={handleCloseReceive}>Close</Button>
                </Modal.Footer>
            </Modal>  
        </div>
    )
}

export default Home