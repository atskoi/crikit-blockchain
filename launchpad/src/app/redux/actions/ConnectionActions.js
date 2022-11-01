export const UPDATE_NETWORK = 'UPDATE_NETWORK'
export const UPDATE_WALLET = 'UPDATE_WALLET'
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS'
export const UPDATE_BALANCE = 'UPDATE_BALANCE'
export const UPDATE_PROVIDER = 'UPDATE_PROVIDER'
export const UPDATE_CHAINID = 'UPDATE_CHAINID'
// hello
export const updateProvider = (provider) => (dispatch) => {
    dispatch({
        type: UPDATE_PROVIDER,
        payload: { provider },
    })
}
export const updateNetwork = (network) => (dispatch) => {
    dispatch({
        type: UPDATE_NETWORK,
        payload: { network },
    })
}
export const updateWallet = (wallet) => (dispatch) => {
    dispatch({
        type: UPDATE_WALLET,
        payload: { wallet },
    })
}
export const updateAddress = (address) => (dispatch) => {
    dispatch({
        type: UPDATE_ADDRESS,
        payload: { address },
    })
}

export const updateChainId = (chainId) => (dispatch) => {
    dispatch({
        type: UPDATE_CHAINID,
        payload: { chainId },
    })
}

export const updateBalance = (balance) => (dispatch) => {
    dispatch({
        type: UPDATE_BALANCE,
        payload: { balance },
    })
}
