import './SeedPhrase.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

function AddSeedPhrase() {
    return (
        <div className="add-seedphrase">
            <div className="container">
                <div className="d-flex pt-3 cursor-pointer">
                    <FontAwesomeIcon className="mb-3" icon={faChevronLeft} color="#333333" size="lg" />&nbsp;&nbsp;&nbsp;Back
                </div>

                <div className="add-seedphrase-wrap d-flex align-items-center justify-content-center flex-column">
                    <h3 className="font-size-200 text-color-6 mb-5">Secret Backup Phrase</h3>
                    <div className="row align-items-start justify-content-center w-2/3">
                        <div className="col-12 col-md-6">
                            <p className="text-color-6 mb-0 font-size-100 mb-4">Your secret backup phrase makes it easy to backup and restore your account.</p>
                            <p className="font-bold text-color-6 mb-0 font-size-100 mb-4">WARNING: Never disclose your backup phrase. Anyone with this phrase can take your cryptos forever.</p>
                            <div className="add-seedphrase-box pt-3 px-3 mb-4 d-flex flex-wrap justify-content-evenly align-items-center w-100">
                                <p className="add-seedphrase-word text-color-7 mb-0 font-size-100 mb-3">collection</p>
                                <p className="add-seedphrase-word text-color-7 mb-0 font-size-100 mb-3">nft</p>
                                <p className="add-seedphrase-word text-color-7 mb-0 font-size-100 mb-3">blockchain</p>
                                <p className="add-seedphrase-word text-color-7 mb-0 font-size-100 mb-3">crypto</p>
                                <p className="add-seedphrase-word text-color-7 mb-0 font-size-100 mb-3">governance</p>
                                <p className="add-seedphrase-word text-color-7 mb-0 font-size-100 mb-3">token</p>
                                <p className="add-seedphrase-word text-color-7 mb-0 font-size-100 mb-3">own</p>
                                <p className="add-seedphrase-word text-color-7 mb-0 font-size-100 mb-3">rewards</p>
                                <p className="add-seedphrase-word text-color-7 mb-0 font-size-100 mb-3">mustachio</p>
                                <p className="add-seedphrase-word text-color-7 mb-0 font-size-100 mb-3">titans</p>
                                <p className="add-seedphrase-word text-color-7 mb-0 font-size-100 mb-3">genesis</p>
                                <p className="add-seedphrase-word text-color-7 mb-0 font-size-100 mb-3">block</p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className="add-seedphrase-btns btn btn-custom-5 w-100" type="button">Copy to Clipboard</button>
                                <button className="btn btn-custom-2 w-100" type="button">Next</button>
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