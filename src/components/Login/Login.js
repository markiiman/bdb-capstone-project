import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faKey, faPlus } from '@fortawesome/free-solid-svg-icons';

function Login() {
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
                        <button className="btn btn-custom-2 w-100" type="button">Import Wallet</button>
                    </div>
                    <div className="login-box text-center p-4">
                        <FontAwesomeIcon className="mb-3" icon={faKey} color="#C8C8C8" size="5x" />
                        <p className="neo-bold text-color-7 mb-0 font-size-120 mb-2">Add using private key</p>
                        <p className="text-color-7 mb-0 font-size-90 mb-4">Import your existing wallet using your own private key</p>
                        <button className="btn btn-custom-2 w-100" type="button">Import Wallet</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;
