import {
    UPDATE_NETWORK,
    UPDATE_WALLET,
    UPDATE_ADDRESS,
    UPDATE_BALANCE,
    UPDATE_PROVIDER,
    UPDATE_CHAINID,
} from '../actions/ConnectionActions'
import EthImg from '../../images/eth.jpg'
import BscImg from '../../images/bsc.jpg'

const initialState = {
    network: {
        name: 'BSC Mainnet',
        code: 'bsc_main',
        img: BscImg,
    },
    chainId: 56,
    wallet: {},
    address: {},
    balance: '0.0000',
    provider: {},
}

const ConnectionReducer = function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case UPDATE_NETWORK: {
            return {
                ...state,
                network: payload.network,
            }
        }
        case UPDATE_WALLET: {
            return {
                ...state,
                wallet: payload.wallet,
            }
        }
        case UPDATE_ADDRESS: {
            return {
                ...state,
                address: payload.address ?? {},
            }
        }
        case UPDATE_BALANCE: {
            return {
                ...state,
                balance: payload.balance,
            }
        }
        case UPDATE_PROVIDER: {
            return {
                ...state,
                provider: payload.provider,
            }
        }
        case UPDATE_CHAINID: {
            return {
                ...state,
                chainId: payload.chainId,
            }
        }
        default:
            return {
                ...state,
            }
    }
}

export default ConnectionReducer
