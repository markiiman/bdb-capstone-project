import './Home.css'
import ethereum from '../../img/eth_logo.svg'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faUpload, faPoop } from '@fortawesome/free-solid-svg-icons'
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
        odoBalance: 0, // for project purposes only
        odoContract: null, // for project purposes only
        address: "",
        sendSelectedToken: "",
        sendTokenAmount: "",
        ethTransactions: "",
        odoTransactions: "",
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

    const sendToken = async () => {
        var sendTokenButton = document.getElementById("send-token-button");
        var hideSendTokenModalButton = document.getElementById("hide-send-token-modal-button");

        sendTokenButton.disabled = true;
        sendTokenButton.innerHTML = "Sending...";
        hideSendTokenModalButton.classList.add("d-none");

        var token = document.getElementById("token").value;
        var recipient = document.getElementById("recipient").value;
        var amount = ethers.utils.parseEther(document.getElementById("amount").value);
        let wallet = new ethers.Wallet(state.privateKey, provider);

        if(token === "ETH") {
            let tx = {
                to: recipient,
                value: amount
            }
            wallet.sendTransaction(tx)
                .then((txObj) => {
                    sendTokenButton.disabled = false
                    sendTokenButton.innerHTML = "Send";
                    hideSendTokenModalButton.classList.remove("d-none");

                    handleCloseSend();

                    console.log('txHash', txObj.hash)

                    const receipt = provider.waitForTransaction(txObj.hash, 1, 150000).then(() => {
                        getBalances();
                        getEthTransactions();
                    });
                })
        } else {
            let odoContract = state.odoContract.connect(wallet);
            let tx = await odoContract.transfer(recipient, amount);
            await tx.wait();

            sendTokenButton.disabled = false
            sendTokenButton.innerHTML = "Send";
            hideSendTokenModalButton.classList.remove("d-none");

            handleCloseSend();

            getBalances();
            getOdoTransactions();
        }
    }

    const getEthTransactions = async () => {
        let ethTransactions = await axios.get("https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=0x0f3460B495958e256fd44aA0bD4b424bDbADBdAe&startblock=0&endblock=latest&page=1&offset=10&sort=desc&apikey=KHCSUR3QZTHMIQVA3NW7YJ6IBPG9W93N69")
        _setState("ethTransactions", ethTransactions)
    };

    const getOdoTransactions = async () => {
        let odoTransactions = await axios.get("https://api-ropsten.etherscan.io/api?module=account&action=tokentx&contractaddress=0xD9B6941c446e3322C761346E66aF9e710FC97de3&address=0x0f3460B495958e256fd44aA0bD4b424bDbADBdAe&page=1&offset=100&startblock=0&endblock=latest&sort=desc&apikey=YourApiKeyToken")
        _setState("odoTransactions", odoTransactions)
    };

    const getBalances = async () => {
        let ethBalance = ethers.utils.formatEther(await provider.getBalance(localStorage.getItem('add')), {pad: 5});
        _setState("ethBalance", ethBalance)

        let odoContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
        _setState("odoContract", odoContract)
        let odoBalance = ethers.utils.formatEther(await odoContract.balanceOf(localStorage.getItem('add')));
        _setState("odoBalance", odoBalance)
    }

    useEffect(() => {
        if (localStorage.getItem('add') !== null) { // wallet address is created
            _setState("signer", JSON.parse(localStorage.getItem('signer')))
            _setState("privateKey", localStorage.getItem('pk'))
            _setState("address", localStorage.getItem('add'))

            console.log(provider);

            getBalances();
            getEthTransactions();
        } else { // no wallet address created yet
            window.location.href="/login"
        }
        // insert web3 functions here

    }, [provider])

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
                            <p className="neo-bold text-color-6 font-size-200 mb-4">{ parseFloat(state.ethBalance).toFixed(5) } rETH</p>
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
                            <p className="text-color-6 font-size-130 mb-0">{ parseFloat(state.ethBalance).toFixed(5) } rETH</p>
                        </div>
                        <div className="home-token-item d-flex align-items-center justify-content-start">
                            <div className="token-img mb-0 p-2" style={{'height':'44px'}}>
                                <img src="https://elephant.art/wp-content/uploads/2019/11/poop-emoji.jpg" className="w-100" alt="Ethereum Logo" />
                            </div>
                            <p className="text-color-6 font-size-130 mb-0">{ parseFloat(state.odoBalance).toFixed(5) } ODO</p>
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
                        <input type="text" className="form-control" placeholder="0x7e19..." id="recipient"/>
                    </div>
                    <div className="form-group mb-3">
                        <label className="font-size-90 text-color-7 mb-2" for="amount">Amount</label>
                        <input type="number" min="0.00" step="0.01" placeholder="1" className="form-control" id="amount" />
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <button className="btn btn-custom-2" type="button" id="send-token-button" onClick={sendToken}>Send</button>
                    <Button className="neo-bold" variant="secondary" id="hide-send-token-modal-button" onClick={handleCloseSend}>
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