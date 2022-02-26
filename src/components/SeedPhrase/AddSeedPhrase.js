import './SeedPhrase.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function AddSeedPhrase(props) {
    const provider = props.provider
    const ethers = props.ethers

    const [state, setState] = useState({
        copyToClipboard: false,
        seedPhrase: [],
        seedPhraseText: "",
        privateKey: "", // for project purposes only
        address: "",
    })

    const back = () => {
        window.location.href = "/login";
    }

    // state updater
    const _setState = (name, value) => {
        setState(prevState => ({...prevState, [name]: value}))
    }

    const copyClipboard = () => {
        var dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.setAttribute('value', state.seedPhraseText);
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        _setState("copyToClipboard", true)
    }

    useEffect(() => {
        const wallet = ethers.Wallet.createRandom()
        const signer = wallet.connect(provider)
        _setState("seedPhraseText", wallet.mnemonic.phrase)
        _setState("seedPhrase", wallet.mnemonic.phrase.split(" "))
        _setState("privateKey", wallet.privateKey)
        _setState("address", wallet.address)

        // save items
        localStorage.setItem("sp", JSON.stringify(wallet.mnemonic.phrase.split(" ")))
        localStorage.setItem("sptext", wallet.mnemonic.phrase)
        localStorage.setItem("add", wallet.address)
        localStorage.setItem("pk", wallet.privateKey)
        localStorage.setItem("signer", JSON.stringify(signer))
    }, [])

    useEffect(() => {
        if (state.copyToClipboard) {
            setTimeout(() => {
                _setState("copyToClipboard", false)
            }, 3000)
        }
    }, [state.copyToClipboard])

    return (
        <div className="add-seedphrase">
            <div className="container">
                <div onClick={back} className="d-flex pt-3 cursor-pointer">
                    <FontAwesomeIcon className="mb-3" icon={faChevronLeft} color="#333333" size="lg" />&nbsp;&nbsp;&nbsp;Back
                </div>

                <div className="add-seedphrase-wrap d-flex align-items-center justify-content-center flex-column">
                    <h3 className="font-size-200 text-color-6 mb-5">Secret Backup Phrase</h3>
                    <div className="row align-items-start justify-content-center w-2/3">
                        <div className="col-12 col-md-6">
                            <p className="text-color-6 mb-0 font-size-100 mb-4">Your secret backup phrase makes it easy to backup and restore your account.</p>
                            <p className="font-bold text-color-6 mb-0 font-size-100 mb-4">WARNING: Never disclose your backup phrase. Anyone with this phrase can take your cryptos forever.</p>
                            <div id="seedphrase-box" className="add-seedphrase-box pt-3 px-3 mb-4 d-flex flex-wrap justify-content-evenly align-items-center w-100">
                                {state.seedPhrase.map((x,k) => (
                                    <p className="add-seedphrase-word text-color-7 mb-0 font-size-100 mb-3" key={k}>{x}</p>
                                ))}
                            </div>
                            <div className="d-flex justify-content-center">
                                <button onClick={copyClipboard} className="add-seedphrase-btns btn btn-custom-5 w-100" type="button">
                                    {state.copyToClipboard ? "Copied!" : "Copy to Clipboard" }
                                </button>
                                <Link to="/enter-seedphrase" className="btn btn-custom-2 w-100">Next</Link>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <p className="text-color-7 mb-0 font-size-100 mb-4">Tips:</p>
                            <p className="text-color-7 mb-0 font-size-100 mb-4">Store this phrase in a password manager.</p>
                            <p className="text-color-7 mb-0 font-size-100 mb-4">Write this phrase on a piece of paper and store in a secure location. If you want to even more security, write it down on multiple pieces of paper and store each in 2-3 different places.</p>
                            <p className="text-color-7 mb-0 font-size-100 mb-4">Memorize this phrase.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSeedPhrase