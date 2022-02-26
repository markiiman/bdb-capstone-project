import './SeedPhrase.css'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from 'react-bootstrap'
import { faChevronLeft, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

function EnterSeedPhrase() {
    const [state, setState] = useState({
        seedPhraseReview: [],
        seedPhrase: [],
        seedPhraseShuffled: [],
        seedPhraseText: "",
    })
    
    useEffect(() => {
        _setState("seedPhrase", JSON.parse(localStorage.getItem('sp')))
        _setState("seedPhraseShuffled", shuffle(JSON.parse(localStorage.getItem('sp'))))
        _setState("seedPhraseText", localStorage.getItem('sptext'))
    }, [])

    const back = () => {
        window.location.href = "/seedphrase";
    }

    const proceed = () => {
        window.location.href = "/";
    }

    // state updater
    const _setState = (name, value) => {
        setState(prevState => ({...prevState, [name]: value}))
    }

    const addToSeedPhraseReview = (word, index) => {
        if (state.seedPhraseReview.indexOf(word) == -1) {
            _setState("seedPhraseReview", state.seedPhraseReview.concat(word))
            
            var obj = document.getElementById(`sp-item-${index}`)
            obj.classList.add("active")
        }
    }

    const confirm = () => {
        const seedPhraseReviewText = state.seedPhraseReview.join(" ")
        if (seedPhraseReviewText === state.seedPhraseText) {
            handleShowSuccess()
        } else {
            handleShowError()
        }
    }

    const clear = () => {
        _setState("seedPhraseReview", [])
        var objs = document.querySelectorAll('.active')

        for (var i = 0; i < objs.length; i++) {
            objs[i].classList.remove("active")
        }
    }

    // array shuffler for seed phrase choices
    const shuffle = arr => {
        var currentIndex = arr.length,  randomIndex
      
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--
      
          // And swap it with the current element.
          [arr[currentIndex], arr[randomIndex]] = [
            arr[randomIndex], arr[currentIndex]]
        }
      
        return arr
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
                            {state.seedPhraseReview.map((x,k) => (
                                <div className="sp-item" key={k}>{x}</div>
                            ))}
                        </div>
                    </div>

                    <div className="esp-wrap d-flex flex-wrap justify-content-start align-items-start mb-3">
                        {state.seedPhraseShuffled.map((x,k) => (
                            <div onClick={() => addToSeedPhraseReview(x, k)} id={`sp-item-${k}`} className="cursor-pointer sp-item" key={k}>{x}</div>
                        ))}
                    </div>
                    
                    <div className="sp-buttons d-flex justify-content-center">
                        <button onClick={confirm} className="sp-confirm btn btn-custom-2">CONFIRM</button>
                        <button onClick={clear} className="btn btn-custom-5">CLEAR</button>
                    </div>
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
                    <button className="btn btn-custom-2 neo-bold" onClick={proceed} type="button">Proceed</button>
                </Modal.Footer>
            </Modal>  

            {/* Modal for unsuccessful seedphrase */}
            <Modal show={showError} onHide={handleCloseError} backdrop="static" keyboard={false} size="sm" centered>
                <Modal.Body>
                    <div className="text-center mb-3">
                        <FontAwesomeIcon color="red" size="6x" icon={faExclamationCircle} />
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