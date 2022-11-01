import { ethers } from 'ethers'
import axios from 'axios'
import { InjectedConnector } from '@web3-react/injected-connector'
import moment from 'moment'
import React from 'react'
import { BigNumber } from 'bignumber.js'
import { FEES, getContract, ZeroAddress } from './Addresses.js'
import { isMobile } from 'react-device-detect'

export const NATIVE_TOKEN = {
    97: 'BNB',
    56: 'BNB',
    43113: 'AVAX',
    80001: 'MATIC',
}
export const BNB_DECIMALS = 18
export const BSCSCAN_API = 'EB828URQE9VHRUT637WH7KFYVKNP5WIE3S'
export const FEEDENOMINATOR = 50
export const BSCSCAN_TEST_URL = 'https://api-testnet.bscscan.com'
export const BSCSCAN_MAIN_URL = 'https://api.bscscan.com'
export const ETH_MAIN = 1
export const BSC_MAIN = 56
export const BSC_TEST = 97
export const POLYGON_MAIN = 137
export const POLYGON_TEST = 80001
export const KUCOIN_MAIN = 321
export const AVAL_MAIN = 43114
export const AVAX_FUJI = 43113

const supportedChainIds = [
    ETH_MAIN,
    BSC_MAIN,
    BSC_TEST,
    POLYGON_MAIN,
    POLYGON_TEST,
    KUCOIN_MAIN,
    AVAL_MAIN,
    AVAX_FUJI,
]
const injected = new InjectedConnector({
    supportedChainIds,
})

export function getSymbol(chainId, currency) {
    return currency === 'bnb' ? NATIVE_TOKEN[chainId] : currency.toUpperCase()
}

export function getFeeAmount(chainId, token_type) {
    if (token_type === 'standard') {
        return FEES[chainId]['Standard']
    } else if (token_type === 'liquidity') {
        return FEES[chainId]['LiquidityGenerator']
    } else if (token_type === 'buyback') {
        return FEES[chainId]['BuybackBaby']
    }
}
export function getInjectedConnector() {
    return injected
}
// BSC MAINNET
export const BSC_RPC_PROVIDERS = [
    'https://bsc-dataseed.binance.org',
    'https://bsc-dataseed1.defibit.io',
    'https://bsc-dataseed1.ninicoin.io',
    'https://bsc-dataseed2.defibit.io',
    'https://bsc-dataseed3.defibit.io',
    'https://bsc-dataseed4.defibit.io',
    'https://bsc-dataseed2.ninicoin.io',
    'https://bsc-dataseed3.ninicoin.io',
    'https://bsc-dataseed4.ninicoin.io',
    'https://bsc-dataseed1.binance.org',
    'https://bsc-dataseed2.binance.org',
    'https://bsc-dataseed3.binance.org',
    'https://bsc-dataseed4.binance.org',
]
export function isNumeric(value) {
    return /^-?\d+$/.test(value)
}

export function getSupportedToken(chainId, currency) {
    if (currency === 'bnb') return [getContract(chainId, 'NATIVE'), 18]
    else if (currency === 'busd') return [getContract(chainId, 'BUSD'), 18]
    else if (currency === 'usdt') return [getContract(chainId, 'USDT'), 6]
    else return [getContract(chainId, 'USDC'), 6]
}

export const metamask_error = () => (
    <div>
        Could not find a wallet to connect to.
        <br />
        {isMobile && (
            <>
                {' '}
                <a
                    href="https://metamask.app.link/dapp/crikit.app"
                    className="text-primary underline"
                    rel="noopener noreferrer"
                >
                    Add a wallet
                </a>{' '}
                to start using the app.{' '}
            </>
        )}
        {!isMobile && (
            <>
                {' '}
                <a
                    href="https://metamask.io"
                    target="_blank"
                    className="text-primary underline"
                    rel="noopener noreferrer"
                >
                    Add a wallet
                </a>{' '}
                to start using the app.
            </>
        )}
    </div>
)
export function getChainId(networkName) {
    let chainId
    if (networkName === 'eth_main') {
        chainId = ETH_MAIN
    } else if (networkName === 'bsc_main') {
        chainId = BSC_MAIN
    } else if (networkName === 'matic_main') {
        chainId = POLYGON_MAIN
    } else if (networkName === 'kcc_main') {
        chainId = KUCOIN_MAIN
    } else if (networkName === 'bsc_test') {
        chainId = BSC_TEST
    } else if (networkName === 'matic_test') {
        chainId = POLYGON_TEST
    } else if (networkName === 'avax_fuji') {
        chainId = AVAX_FUJI
    } else {
        chainId = BSC_TEST
    }
    return chainId
}

export const getReuest = async (url) => {
    let requestData
    return new Promise(function (myResolve, myReject) {
        axios({
            method: 'get',
            url: url,
        })
            .then((response) => {
                requestData = response.data
                myResolve(requestData)
            })
            .catch((e) => {
                requestData = e.toString()
                myReject(requestData)
            })
    })
}

export const getABI = async (contract_address, network) => {
    let bscscan_url
    if (network === BSC_TEST) {
        bscscan_url = `${BSCSCAN_TEST_URL}/api?module=contract&action=getabi&address=${contract_address}&apikey=${BSCSCAN_API}`
    } else if (network === BSC_MAIN) {
        bscscan_url = `${BSCSCAN_MAIN_URL}/api?module=contract&action=getabi&address=${contract_address}&apikey=${BSCSCAN_API}`
    } else {
        bscscan_url = `${BSCSCAN_TEST_URL}/api?module=contract&action=getabi&address=${contract_address}&apikey=${BSCSCAN_API}`
    }
    let contractABI = ''
    const data = await getReuest(bscscan_url)
    if (data.message === 'OK') {
        contractABI = JSON.parse(data.result)
        return contractABI
    } else {
        return []
    }
}

export function math_multiply(num1, num2) {
    let big_numb1 = new BigNumber(num1)
    let big_numb2 = new BigNumber(num2)
    let result = big_numb1.multipliedBy(big_numb2)
    return result.toFixed()
}

export function math_divide(num1, num2) {
    let big_numb1 = new BigNumber(num1)
    let big_numb2 = new BigNumber(num2)
    let result = big_numb1.dividedBy(big_numb2)
    return result.toFixed()
}

export const NETWORK_METADATA = {
    [BSC_MAIN]: {
        chainId: '0x' + BSC_MAIN.toString(16),
        chainName: 'BSC',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
        },
        rpcUrls: BSC_RPC_PROVIDERS,
        blockExplorerUrls: ['https://bscscan.com'],
    },
    [BSC_TEST]: {
        chainId: '0x' + BSC_TEST.toString(16),
        chainName: 'BSC Testnet',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
        },
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
        blockExplorerUrls: ['https://testnet.bscscan.com/'],
    },
    [POLYGON_MAIN]: {
        chainId: '0x' + POLYGON_MAIN.toString(16),
        chainName: 'Matic(Polygon) Mainnet',
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18,
        },
        rpcUrls: ['https://rpc-mainnet.maticvigil.com'],
        blockExplorerUrls: ['https://polygonscan.com'],
    },
    [POLYGON_TEST]: {
        chainId: '0x' + POLYGON_TEST.toString(16),
        chainName: 'Polygon Testnet',
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18,
        },
        rpcUrls: ['https://rpc-mumbai.matic.today'],
        blockExplorerUrls: ['https://explorer-mumbai.maticvigil.com'],
    },
    [KUCOIN_MAIN]: {
        chainId: '0x' + KUCOIN_MAIN.toString(16),
        chainName: 'KuCoin Community Chain Mainnet',
        nativeCurrency: {
            name: 'KCS',
            symbol: 'KCS',
            decimals: 18,
        },
        rpcUrls: ['https://rpc-mainnet.kcc.network'],
        blockExplorerUrls: ['https://explorer.kcc.io/en'],
    },
    [ETH_MAIN]: {
        chainId: '0x' + ETH_MAIN.toString(16),
        chainName: 'Ethereum Mainnet',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: [
            'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        ],
        blockExplorerUrls: ['https://etherscan.io'],
    },
    [AVAL_MAIN]: {
        chainId: '0x' + AVAL_MAIN.toString(16),
        chainName: 'AVAX Mainnet',
        nativeCurrency: {
            name: 'AVAX',
            symbol: 'AVAX',
            decimals: 18,
        },
        rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
        blockExplorerUrls: ['https://cchain.explorer.avax.network'],
    },
    [AVAX_FUJI]: {
        chainId: '0x' + AVAX_FUJI.toString(16),
        chainName: 'AVAX FUJI',
        nativeCurrency: {
            name: 'AVAX',
            symbol: 'AVAX',
            decimals: 18,
        },
        rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
        blockExplorerUrls: ['https://testnet.snowtrace.io/'],
    },
}

export function bigNumberify(n) {
    return new ethers.utils.BigNumber(n)
}

export function expandDecimals(n, decimals) {
    return bigNumberify(n).mul(bigNumberify(10).pow(decimals))
}


export function getTokenUrl(network, address) {
    if (network === BSC_TEST) {
        return 'https://testnet.bscscan.com/address/' + address
    } else if (network === BSC_MAIN) {
        return 'https://testnet.bscscan.com/address/' + address
    } else if (network === POLYGON_MAIN) {
        return 'https://testnet.bscscan.com/address/' + address
    } else {
        return 'https://testnet.bscscan.com/address/' + address
    }
}


export function getScanUrl(chainId, address) {
    if (chainId === 1) {
        return `https://etherscan.com/token/${address}`
    } else if (chainId === 3) {
        return `https://rinkeby.etherscan.com/token/${address}`
    } else if (chainId === 56) {
        return `https://bscscan.com/token/${address}`
    } else if (chainId === 97) {
        return `https://testnet.bscscan.com/token/${address}`
    } else if (chainId === 80001) {
        return `https://mumbai.polygonscan.com/token/${address}`
    } else if (chainId === 43113) {
        return `https://testnet.snowtrace.io/token/${address}`
    } else {
        return `https://testnet.bscscan.com/token/${address}`
    }
}

export async function getLastPrice() {
    const apiUrl =
        'https://api.pancakeswap.info/api/v2/tokens/0xadA543c0356663F9388a46fea154CEc62Ba3932f'
    const lastPriceFEED = await fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => data)
    return lastPriceFEED
}

export function getTokenScanUrl(chainId, address) {
    if (chainId === 56) {
        return `https://testnet.bscscan.com/address/${address}#code`
    } else if (chainId === 97) {
        return `https://bscscan.com/address/${address}#code`
    } else if (chainId === 80001) {
        return `https://mumbai.polygonscan.com/address/${address}#code`
    } else if (chainId === 43113) {
        return `https://testnet.snowtrace.io/address/${address}#code`
    } else {
        return `https://snowtrace.io/address/${address}#code`
    }
}
