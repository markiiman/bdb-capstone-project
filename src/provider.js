import { ethers } from "ethers"

export const networkProvider = (network = "ropsten" , apiId) => {
    const provider = new ethers.providers.InfuraProvider(network, apiId)
    return provider
}
