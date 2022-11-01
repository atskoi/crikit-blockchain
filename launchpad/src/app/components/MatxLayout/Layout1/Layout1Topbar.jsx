import React, { useEffect, useState } from 'react'
import {
    Icon,
    IconButton,
    MenuItem,
    useMediaQuery,
    Button,
    Modal,
} from '@material-ui/core'
import IconSwapHoriz from '@material-ui/icons/SwapHoriz'
import { MatxMenu } from 'app/components'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import useSettings from 'app/hooks/useSettings'
import { useDispatch, useSelector } from 'react-redux'
import EthImg from '../../../images/eth.jpg'
import BscImg from '../../../images/bsc.jpg'
import PolygonImg from '../../../images/polygon.jpg'
import ArbitrumImg from '../../../images/arbitrum.png'
import AvalancheImg from '../../../images/avalanche.jpg'
import MoonriverImg from '../../../images/moonriver.png'
import FantomImg from '../../../images/fantom.jpg'
import GnosisImg from '../../../images/gnosis.png'
import HarmonyImg from '../../../images/harmonyone.jpg'
import TelosImg from '../../../images/telos.png'
import CeloImg from '../../../images/celo.jpg'
import FuseImg from '../../../images/fuse.png'
import OkexImg from '../../../images/okex.jpg'
import HecoImg from '../../../images/heco.jpg'
import PalmImg from '../../../images/palm.jpg'
import MetamaskImg from '../../../images/metamask.svg'
import WalletConnectImg from '../../../images/wallet_connect.svg'
import {
    updateNetwork,
    updateWallet,
    updateAddress,
    updateBalance,
    updateChainId,
} from '../../../redux/actions/ConnectionActions'
import Grid from '@material-ui/core/Grid'
import { providers, ethers } from 'ethers'
import {
    NETWORK_METADATA,
    getChainId,
    metamask_error,
} from '../../../utils/Helpers.js'
import { toast } from 'react-toastify'
import { isMobile } from 'react-device-detect'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    topbar: {
        top: 0,
        zIndex: 96,
        transition: 'all 0.3s ease',
        background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 44%, rgba(247, 247, 247, 0.4) 50%, rgba(255, 255, 255, 0))',

        '& .topbar-hold': {
            backgroundColor: '#1a2e3b',
            // backgroundColor: "#FFFFFF",
            height: 80,
            paddingLeft: 18,
            paddingRight: 20,
            [theme.breakpoints.down('sm')]: {
                paddingLeft: 16,
                paddingRight: 16,
            },
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 14,
                paddingRight: 16,
            },
        },
        '& .pfixed': {
            height: 64,
            borderBottom: '1px solid rgba(30, 30, 30, 0.06)',
        },
    },
    demo: {
        flex: 1,
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
    },
    demoIcon: {},
    dropdownShadow: {
        boxShadow: '1px 1px 5px #3333',
    },
    demoName: {
        marginLeft: '5px',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    demoSmName: {
        color: '#FFFFFF',
        // color: '#000000',
        marginLeft: theme.spacing(1),
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    addressName: {
        fontSize: '14px',
    },
    createBtn: {
        margin: theme.spacing(1),
        width: '120px',
        [theme.breakpoints.down('md')]: {
            margin: 3,
            width: '50px',
        },
    },
    modalTitle: {
        fontSize: '22px',
        padding: '20px 20px 10px',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalCloseBtn: {
        cursor: 'pointer',
        color: '#555',
        fontSize: '18px',
    },
    modalContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 600,
        maxHeight: '100vh',
        overflow: 'auto',
        width: '100%',
        backgroundColor: '#1a2e3b',
        padding: 0,
    },
    modalBody: {
        padding: '20px',
    },
    userMenu: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: 24,
        padding: 4,
        '& span': {
            margin: '0 8px',
            // color: palette.text.secondary
        },
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        width: 95,
        overflow: 'hidden',
    },
    walletBtn: {
        border: '1px solid transparent',
        padding: '10px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '5px',
        backgroundColor: '#ede9dd',
        fontWeight: 500,
        color: '#6ddc00',
        '&:hover': {
            borderColor: '#6ddc00',
        },
        '@media (max-width:780px)': {
            padding: '10px',
        },
    },
    netImg: {
        width: '32px',
        height: '32px',
        borderRadius: '5px',
    },
    netSmImg: {
        width: '25px',
        height: '25px',
        borderRadius: '5px',
    },
    walletImg: {
        width: '32px',
        height: '32px',
        marginRight: '10px',
    },
    netName: {
        margin: '0 20px',
    },
    walletName: {
        margin: '0 0 0 10px',
    },
    netTxt: {
        marginBottom: '5px',
        marginTop: 0,
    },
}))

const Layout1Topbar = () => {
    const theme = useTheme()
    const classes = useStyles()
    const { settings, updateSettings } = useSettings()
    const [web3Obj, setWeb3Obj] = useState(null)

    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))
    const fixed = settings?.layout1Settings?.topbar?.fixed
    const [openNetworkModal, setOpenNetworkModal] = React.useState(false)
    const [openWalletModal, setOpenWalletModal] = React.useState(false)
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    const connection = state.connection
    const walletConnect = async () => {
        const currentProvider = new WalletConnectProvider({
            chainId: 56,
            rpc: {
                56: 'https://bsc-dataseed.binance.org/',
            },
            qrcodeModalOptions: {
                mobileLinks: [
                    'rainbow',
                    'trust',
                    'argent',
                    'metamask',
                    'crypto.com',
                    'pillar',
                    'imtoken',
                    'onto',
                    'tokenpocket',
                    'mathwallet',
                    'bitpay',
                    'ledger',
                ],
            },
        })
        if (currentProvider) {
            await currentProvider
                .enable()
                .then((res) => {
                    async function initProvider() {
                        let web3InstanceCopy = new Web3(currentProvider)
                        let walletAddressCopy =
                            await web3InstanceCopy.eth.getAccounts()
                        if (walletAddressCopy?.length > 0) {
                            dispatch(updateAddress(walletAddressCopy[0]))
                        }
                        setWeb3Obj(currentProvider)
                    }
                    initProvider()
                    // Subscribe to accounts change
                    currentProvider.on('accountsChanged', async (accounts) => {
                        let web3InstanceCopy = new Web3(currentProvider)
                        let walletAddressCopy =
                            await web3InstanceCopy.eth.getAccounts()
                        if (walletAddressCopy?.length > 0) {
                            dispatch(updateAddress(walletAddressCopy[0]))
                        }
                        setWeb3Obj(currentProvider)
                    })

                    // Subscribe to chainId change
                    currentProvider.on('chainChanged', (chainId) => {
                        let n = networks.find(function (networkItem) {
                            return (
                                Number(networkItem.chainId) === Number(chainId)
                            )
                        })
                        if (n) {
                            handleNetworkConnect(n)
                        } else {
                            toast.error(
                                'You switched to wrong network that we do not support. Please switch it to the network we support.'
                            )
                        }
                    })

                    // Subscribe to session connection
                    currentProvider.on('connect', async () => {
                        let web3InstanceCopy = new Web3(currentProvider)
                        let walletAddressCopy =
                            await web3InstanceCopy.eth.getAccounts()
                        if (walletAddressCopy?.length > 0) {
                            dispatch(updateAddress(walletAddressCopy[0]))
                        }
                        setWeb3Obj(currentProvider)
                    })

                    // Subscribe to session disconnection
                    currentProvider.on('disconnect', async (code, reason) => {
                        dispatch(updateAddress(''))
                        await currentProvider.disconnect()
                    })
                })
                .catch((err) => {})
        }
    }

    const connectWallet = async () => {
        let account, balance
        if (window.ethereum) {
            const provider = new providers.Web3Provider(window.ethereum)
            try {
                await provider.send('eth_requestAccounts', [])
                const signer = provider.getSigner()
                account = await signer.getAddress()
                balance = ethers.utils.formatEther(await signer.getBalance())
            } catch (e) {
                console.log('e: ', e.toString())
            }
        } else {
            toast.error(metamask_error())
        }
        console.log('account', account)
        console.log('balance', balance)
        dispatch(updateAddress(account))
        dispatch(updateBalance(balance))
    }

    const handleNetworkModalOpen = () => {
        setOpenNetworkModal(true)
    }
    const handleNetworkModalClose = () => {
        setOpenNetworkModal(false)
    }
    const handleWalletModalOpen = () => {
        setOpenWalletModal(true)
    }
    const handleWalletModalClose = () => {
        setOpenWalletModal(false)
    }
    const switchNetwork = async (networkName) => {
        console.log('networkName: ', networkName.code)
        const chainId = getChainId(networkName.code)
        let account, balance
        const chainIdHex = '0x' + chainId.toString(16)
        if (window.ethereum) {
            const provider = new providers.Web3Provider(window.ethereum)
            try {
                await provider.send('wallet_switchEthereumChain', [
                    { chainId: chainIdHex },
                ])
                const signer = provider.getSigner()
                account = await signer.getAddress()
                balance = ethers.utils.formatEther(await signer.getBalance())
                dispatch(updateAddress(account))
                dispatch(updateBalance(balance))
            } catch (e) {
                if (e.code === 4902) {
                    await provider.send('wallet_addEthereumChain', [
                        NETWORK_METADATA[chainId],
                    ])
                    const signer = provider.getSigner()
                    account = await signer.getAddress()
                    balance = ethers.utils.formatEther(
                        await signer.getBalance()
                    )
                    dispatch(updateAddress(account))
                    dispatch(updateBalance(balance))
                } else {
                    console.log('e: ', e.toString())
                }
            }
        }
        dispatch(updateChainId(chainId))
        // dispatch(updateProvider(provider))
        console.log('dispatch updateChainId', chainId)
    }

    const handleNetworkConnect = async (network) => {
        console.log(network)
        await switchNetwork(network)
        // }
        dispatch(updateNetwork(network))
        setOpenNetworkModal(false)
    }

    const handleWalletConnect = async (wallet) => {
        // if(isMobile)
        // {
        //     window.open("https://metamask.app.link/dapp/crikit.app");
        // }
        if (wallet.code === 'metamask') {
            await connectWallet() // get this value from metamask connection
        } else {
            // console.log('Math Wallet')
            // await connectWallet(); // get this value from metamask connection
            if (wallet.code === 'wallet') {
                await walletConnect()
            }
        }

        dispatch(updateWallet(wallet))

        setOpenWalletModal(false)
    }

    const logoutAddress = async () => {
        dispatch(updateAddress(null))
        if (web3Obj) {
            await web3Obj.disconnect()
        }
    }
    const updateSidebarMode = (sidebarSettings) => {
        updateSettings({
            layout1Settings: {
                leftSidebar: {
                    ...sidebarSettings,
                },
            },
        })
    }

    const handleSidebarToggle = () => {
        let { layout1Settings } = settings
        let mode

        if (isMdScreen) {
            mode =
                layout1Settings.leftSidebar.mode === 'close'
                    ? 'mobile'
                    : 'close'
        } else {
            mode =
                layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full'
        }

        updateSidebarMode({ mode })
    }

    const networks = [
        {
            chainId: 1,
            name: 'Ethereum',
            code: 'eth_main',
            img: EthImg,
        },
        {
            chainId: 1,
            name: 'Polygon',
            code: 'polygon_main',
            img: PolygonImg,
        },
        {
            chainId: 80001,
            name: 'Polygon Test',
            code: 'matic_test',
            img: PolygonImg,
        },
        {
            chainId: 1,
            name: 'Arbitrum',
            code: 'arbitrum',
            img: ArbitrumImg,
        },
        {
            chainId: 43114,
            name: 'Avalanche',
            code: 'avalanche',
            img: AvalancheImg,
        },
        {
            chainId: 43113,
            name: 'Avalanche Fuji',
            code: 'avax_fuji',
            img: AvalancheImg,
        },
        {
            chainId: 1,
            name: 'Moonriver',
            code: 'moonriver',
            img: MoonriverImg,
        },
        {
            chainId: 1,
            name: 'Fantom',
            code: 'fantom',
            img: FantomImg,
        },
        {
            chainId: 56,
            name: 'BSC Mainnet',
            code: 'bsc_main',
            img: BscImg,
        },
        {
            chainId: 1,
            name: 'Gnosis',
            code: 'gnosis',
            img: GnosisImg,
        },
        {
            chainId: 1,
            name: 'Harmony',
            code: 'harmony',
            img: HarmonyImg,
        },
        {
            chainId: 1,
            name: 'Telos EVM',
            code: 'telos',
            img: TelosImg,
        },
        {
            chainId: 1,
            name: 'Celo',
            code: 'celo',
            img: CeloImg,
        },
        {
            chainId: 1,
            name: 'Fuse',
            code: 'fuse',
            img: FuseImg,
        },
        {
            chainId: 1,
            name: 'OKEx',
            code: 'okex',
            img: OkexImg,
        },
        {
            chainId: 1,
            name: 'HECO',
            code: 'heco',
            img: HecoImg,
        },
        {
            chainId: 1,
            name: 'Palm',
            code: 'palm',
            img: PalmImg,
        },
        {
            chainId: 97,
            name: 'BSC Testnet',
            code: 'bsc_test',
            img: BscImg,
        },
    ]

    function addWalletListener() {
        //TODO: implement
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                console.log(accounts)
                if (accounts.length > 0) {
                    updateAddress(accounts[0])
                } else {
                    dispatch(updateAddress(null))
                }
            })
        } else {
            toast.error(metamask_error())
        }
    }
    function addNetworkListener() {
        if (window.ethereum) {
            window.ethereum.on('networkChanged', function (networkId) {
                let n = networks.find(function (networkItem) {
                    return Number(networkItem.chainId) === Number(networkId)
                })
                if (n) {
                    handleNetworkConnect(n)
                } else {
                    toast.error(
                        'You switched to wrong network that we do not support. Please switch it to the network we support.'
                    )
                }
            })
        }
    }

    useEffect(() => {
        addWalletListener()
        addNetworkListener()
    }, [])

    const networkModalBody = (
        <div className="modalContainer network_connect_modal">
            <div id="simple-modal-title" className={classes.modalTitle}>
                <div>Select a network</div>
                <span
                    className={classes.modalCloseBtn}
                    onClick={handleNetworkModalClose}
                >
                    ✖
                </span>
            </div>
            <div id="simple-modal-description" className={classes.modalBody}>
                <Grid container spacing={2}>
                    {networks.map((network, index) => (
                        <Grid item xs={6} key={index}>
                            <div
                                className={
                                    connection.network.code === network.code
                                        ? 'connectBtn active'
                                        : 'connectBtn'
                                }
                                onClick={() => handleNetworkConnect(network)}
                            >
                                <div className="network_item_div">
                                    <img
                                        src={network.img}
                                        alt=""
                                        className={classes.netImg}
                                    />
                                    <p className={classes.netName}>
                                        {network.name}
                                    </p>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    )

    const getWalletAddressString = (address) =>
        address.substring(0, 6) + '...' + address.substring(address.length - 4)
    const wallets = [
        {
            name: 'MetaMask',
            code: 'metamask',
            img: MetamaskImg,
        },
        {
            name: 'WalletConnect',
            code: 'wallet',
            img: WalletConnectImg,
        },
    ]
    const walletModalBody = (
        <div className="modalContainer wallet_connect_modal">
            <div id="simple-modal-title" className={classes.modalTitle}>
                <div>Connect to a wallet</div>
                <span
                    className={classes.modalCloseBtn}
                    onClick={handleWalletModalClose}
                >
                    ✖
                </span>
            </div>
            <div id="simple-modal-description" className={classes.modalBody}>
                <Grid container spacing={2}>
                    {wallets.map((wallet, index) => (
                        <Grid item xs={6} key={index}>
                            <div
                                className={classes.walletBtn}
                                onClick={() => handleWalletConnect(wallet)}
                            >
                                <div className="wallet_item_div">
                                    <div className={classes.walletName}>
                                        {wallet.name}
                                    </div>
                                    <img
                                        src={wallet.img}
                                        alt=""
                                        className={classes.walletImg}
                                    />
                                </div>
                            </div>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <div className="text-center">
                            New to Ethereum?{' '}
                            <a
                                href="https://ethereum.org/en/wallets/"
                                target="_blank"
                                className="text-primary fs-12px"
                            >
                                Learn more about wallets
                            </a>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )

    return (
        <div className={classes.topbar}>
            <div className={clsx({ 'topbar-hold': true, pfixed: fixed })}>
                <div className="flex justify-between items-center h-full">
                    <div className="flex">
                        <IconButton onClick={handleSidebarToggle}>
                            <Icon className="text-white">menu</Icon>
                        </IconButton>
                    </div>
                    <div className="flex items-center">
                        <Button
                            variant="contained"
                            color="primary"
                            style={{
                                marginRight: '5px',
                                padding: '6px',
                                minWidth: '40px',
                            }}
                            onClick={handleNetworkModalOpen}
                            title={connection.network?.name}
                        >
                            {connection.network && (
                                <>
                                    <img
                                        src={connection.network.img}
                                        alt=""
                                        className={classes.netSmImg}
                                    />
                                </>
                            )}
                            {!connection.network && (
                                <>
                                    <span className={classes.demoSmName}>
                                        Network
                                    </span>
                                </>
                            )}
                        </Button>

                        {typeof connection.address === 'object' && (
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ margin: '5px' }}
                                onClick={handleWalletModalOpen}
                            >
                                <IconSwapHoriz className={classes.demoIcon} />
                                Connect
                            </Button>
                        )}
                        {typeof connection.address === 'string' && (
                            <MatxMenu
                                style={{ margin: '5px' }}
                                menuButton={
                                    <Button variant="contained" color="primary">
                                        <span className={classes.addressName}>
                                            {getWalletAddressString(
                                                connection.address
                                            )}
                                        </span>
                                    </Button>
                                }
                            >
                                <MenuItem>
                                    <div className={classes.menuItem}>
                                        {connection.balance}
                                    </div>
                                </MenuItem>
                                <MenuItem>
                                    <div
                                        className={classes.menuItem}
                                        onClick={logoutAddress}
                                    >
                                        Logout
                                    </div>
                                </MenuItem>
                            </MatxMenu>
                        )}
                    </div>
                </div>

                <Modal
                    open={openNetworkModal}
                    onClose={handleNetworkModalClose}
                >
                    {networkModalBody}
                </Modal>
                <Modal open={openWalletModal} onClose={handleWalletModalClose}>
                    {walletModalBody}
                </Modal>
            </div>
        </div>
    )
}

export default React.memo(Layout1Topbar)
