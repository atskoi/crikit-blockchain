import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
    Button,
    CircularProgress,
    Grid,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
} from '@material-ui/core'
import StandardTokenFactory from '../abi/StandardTokenFactory.json'
import { getContract, FEES } from '../utils/Addresses.js'
import {
    BSC_MAIN,
    BSC_TEST,
    expandDecimals,
    getTokenScanUrl,
    NATIVE_TOKEN,
    getFeeAmount,
    isNumeric,
} from '../utils/Helpers.js'
import { makeStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { useHistory } from 'react-router-dom'
import { ethers, providers } from 'ethers'
import { toast } from 'react-toastify'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    loadingIcon: {
        marginRight: '5px',
    },
    tableTd: {
        border: '1px solid #dbdbdb',
        padding: '10px',
    },
    paper: {
        padding: '5px',
        textAlign: 'center',
        color: '#000000',
    },
    link: {
        color: '#ffffff',
        '&:hover': {
            textDecoration: 'none',
        },
    },
    labelStyle: {
        color: '#888888',
    },
    helpTxt: {
        color: '#ff0000',
        marginTop: '4px',
        marginBottom: '0px',
    },
}))

const CreateTokenComponent = (props) => {
    const selector = useSelector((state) => state)
    const connection = selector.connection
    if (window.ethereum === undefined) {
        toast.error(
            <div>
                Could not find a wallet to connect to.
                <br />
                <a
                    href="https://metamask.io"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Add a wallet
                </a>{' '}
                to start using the app.
            </div>
        )
    }
    const classes = useStyles()
    const history = useHistory()
    const [feeAmount, setFeeAmount] = useState('0.0')
    const [state, setState] = useState({
        token_type: 'standard',
        antibot: false,
        created: false,
        loading: false,
        address: '',
        router: 'testnet_pancakeswap',
        error: {},
    })

    useEffect(() => {
        if (connection && connection.chainId) {
            setFeeAmount(
                getFeeAmount(
                    connection.chainId,
                    state.token_type
                )
            )
        }
    }, [state, connection])
    const {
        token_type,
        name,
        symbol,
        decimals,
        total_supply,
        antibot,
        created,
        loading,
        address,
        router,
        reward_token,
        min_token_balance,
        token_reward_fee,
        marketing_fee,
        marketing_wallet,
        transaction_fee_yield,
        transaction_fee_liquidity,
        charity_address,
        auto_add_liquidity,
        charity_percent,
        buy_back_fee,
        reflection_fee,
        liquidity_fee,
        error,
    } = state

    const handleInputChange = (event) => {
        if (!loading) {
            event.persist()
            setState({
                ...state,
                [event.target.name]: event.target.value,
            })
        }
    }
    const handleCheckboxChange = (event) => {
        setState({
            ...state,
            antibot: event.target.checked,
        })
    }
    const viewTransaction = () => {
        window
            .open(getTokenScanUrl(connection.chainId, address), '_blank')
            .focus()
    }
    const createLaunchpad = () => {
        history.push('/launchpad/create?token=' + address)
    }
    const createFairLaunchpad = () => {
        history.push('/fairlaunch/create?token=' + address)
    }
    const copyAddress = () => {
        navigator.clipboard.writeText(address)
        toast.success('Successfully copied!')
    }

    const chooseFactory = (abi, bytecode, signer) => {
        return new ethers.ContractFactory(abi, bytecode, signer)
    }

    const handleSubmit = async () => {
        console.log('handleSubmit : ')
        let validator = {}
        if (!name) {
            validator.name = 'Name is required.'
        } else if (name.length > 255) {
            validator.name = 'Name is too long. Max allowed characters are 255.'
        }
        if (!symbol) {
            validator.symbol = 'Symbol is required.'
        } else if (symbol.length > 255) {
            validator.symbol =
                'Name is too long. Max allowed characters are 255.'
        }
        if (!decimals) {
            validator.decimals = 'Decimals is required.'
        } else if (decimals < 1 || !isNumeric(decimals)) {
            validator.decimals =
                'Decimals should be integer greater than or equal 1.'
        }
        if (!total_supply) {
            validator.total_supply = 'Total supply is required.'
        } else if (total_supply < 1 || !isNumeric(total_supply)) {
            validator.total_supply =
                'Total supply should be integer greater than or equal 1.'
        }
        setState({
            ...state,
            loading: true,
        })
        //put create token logic
        try {
            if (window.ethereum) {
                const provider = new providers.Web3Provider(window.ethereum)
                await provider.send('eth_requestAccounts', [])
                const signer = provider.getSigner()
                const amount = new ethers.utils.BigNumber(state.total_supply)
                if (state.token_type === 'standard') {
                    console.log(
                        'standardTokenFactory : ',
                        state.name,
                        state.symbol,
                        state.decimals,
                        amount.mul(expandDecimals(1, state.decimals)),
                        {
                            value: ethers.utils.parseEther(
                                FEES[connection.chainId]['Standard']
                            ),
                        }
                    )
                    const mySandardTokenFactory = new ethers.Contract(
                        getContract(
                            connection.chainId,
                            'StandardTokenFactory'
                        ),
                        StandardTokenFactory.abi,
                        signer
                    )
                    const tx = await mySandardTokenFactory.createContract(
                        state.name,
                        state.symbol,
                        state.decimals,
                        amount.mul(expandDecimals(1, state.decimals)),
                        {
                            value: ethers.utils.parseEther(
                                FEES[connection.chainId]['Standard']
                            ),
                        }
                    )
                    const receipt = await tx.wait()
                    console.log('Receipt : ', receipt)
                    if (
                        connection.chainId === BSC_TEST ||
                        connection.chainId === BSC_MAIN
                    ) {
                        setState({
                            ...state,
                            address: receipt['events'][0]['address'],
                            created: true,
                        })
                    } else {
                        setState({
                            ...state,
                            address: receipt['events'][1]['address'],
                            created: true,
                        })
                    }
                    toast.success('Successfully created!')
                    if (props.redirect) {
                        history.push('/')
                        history.push(
                            '/' +
                                props.redirect +
                                '?token=' +
                                receipt['events'][0]['address']
                        )
                    }
                }
            } else {
                toast.error(
                    <div>
                        Could not find a wallet to connect to.
                        <br />
                        <a
                            href="https://metamask.io"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Add a wallet
                        </a>{' '}
                        to start using the app.
                    </div>
                )
            }
        } catch (e) {
            toast.error(e.data.message)
            setState({
                ...state,
                created: false,
            })
        }
    }

    return (
        <div>
            {!created && (
                <div>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <TextField
                                className="w-full"
                                label="Select Token Type*"
                                name="token_type"
                                onChange={handleInputChange}
                                value={token_type}
                                InputLabelProps={{
                                    className: classes.labelStyle,
                                    shrink: true,
                                }}
                                size="small"
                                disabled={loading}
                                variant="outlined"
                                select
                            >
                                <MenuItem value="standard">
                                    Standard Token
                                </MenuItem>
                                <MenuItem value="liquidity">
                                    Liquidity Generator Token
                                </MenuItem>
                                {/* <MenuItem value="baby">Baby Token</MenuItem> */}
                                <MenuItem value="buyback">
                                    Buyback Baby Token
                                </MenuItem>
                            </TextField>
                            {error.token_type && (
                                <p className="validation-error">
                                    {error.token_type}
                                </p>
                            )}
                            <p className="helpTxt">
                                Fee: {feeAmount}{' '}
                                {NATIVE_TOKEN[connection.chainId]}
                            </p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="w-full"
                                label="Token Name*"
                                onChange={handleInputChange}
                                type="text"
                                name="name"
                                disabled={loading}
                                size="small"
                                placeholder="Ex: Ethereum"
                                variant="outlined"
                                value={name || ''}
                                InputLabelProps={{
                                    className: classes.labelStyle,
                                    shrink: true,
                                }}
                            />
                            {error.name && (
                                <p className="validation-error">{error.name}</p>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="w-full"
                                label="Token Symbol*"
                                onChange={handleInputChange}
                                type="text"
                                size="small"
                                disabled={loading}
                                name="symbol"
                                placeholder="Ex: ETH"
                                variant="outlined"
                                value={symbol || ''}
                                InputLabelProps={{
                                    className: classes.labelStyle,
                                    shrink: true,
                                }}
                            />
                            {error.symbol && (
                                <p className="validation-error">
                                    {error.symbol}
                                </p>
                            )}
                        </Grid>
                        {token_type === 'standard' && (
                            <Grid item xs={12}>
                                <TextField
                                    className="w-full"
                                    label="Decimals*"
                                    onChange={handleInputChange}
                                    type="number"
                                    size="small"
                                    disabled={loading}
                                    name="decimals"
                                    placeholder="Ex: 18"
                                    variant="outlined"
                                    value={decimals || ''}
                                    InputLabelProps={{
                                        className: classes.labelStyle,
                                        shrink: true,
                                    }}
                                />
                                {error.decimals && (
                                    <p className="validation-error">
                                        {error.decimals}
                                    </p>
                                )}
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <TextField
                                className="w-full"
                                label="Total supply*"
                                onChange={handleInputChange}
                                type="number"
                                size="small"
                                disabled={loading}
                                name="total_supply"
                                placeholder="Ex: 1000000000000"
                                variant="outlined"
                                value={total_supply || ''}
                                InputLabelProps={{
                                    className: classes.labelStyle,
                                    shrink: true,
                                }}
                            />
                            {error.total_supply && (
                                <p className="validation-error">
                                    {error.total_supply}
                                </p>
                            )}
                        </Grid>
                        <Grid item xs={12} className="mt-5">
                            <Button
                                onClick={handleSubmit}
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={loading}
                            >
                                {loading && (
                                    <CircularProgress
                                        className={classes.loadingIcon}
                                        size={20}
                                        color="primary"
                                    />
                                )}
                                Create token
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            )}
            {created && (
                <div>
                    <p className="text-primary text-center">
                        Your token was created!
                    </p>
                    <div className="w-full overflow-auto">
                        <Table className="whitespace-pre">
                            <TableBody>
                                <TableRow>
                                    <TableCell
                                        className={classes.tableTd}
                                        align="left"
                                    >
                                        Name
                                    </TableCell>
                                    <TableCell
                                        className={classes.tableTd}
                                        align="left"
                                    >
                                        {name}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        className={classes.tableTd}
                                        align="left"
                                    >
                                        Symbol
                                    </TableCell>
                                    <TableCell
                                        className={classes.tableTd}
                                        align="left"
                                    >
                                        {symbol}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        className={classes.tableTd}
                                        align="left"
                                    >
                                        Total supply
                                    </TableCell>
                                    <TableCell
                                        className={classes.tableTd}
                                        align="left"
                                    >
                                        {total_supply}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        className={classes.tableTd}
                                        align="left"
                                    >
                                        Address
                                    </TableCell>
                                    <TableCell
                                        className={classes.tableTd}
                                        align="left"
                                    >
                                        {address}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <br />
                    <Grid container spacing={3}>
                        <Grid item md={3} sm={6}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={viewTransaction}
                                className="block w-full h-full"
                            >
                                View transaction on BSCScan
                            </Button>
                        </Grid>
                        <Grid item md={3} sm={6}>
                            <Button
                                variant="outlined"
                                color="primary"
                                className="block w-full h-full"
                                onClick={copyAddress}
                            >
                                Copy address
                            </Button>
                        </Grid>
                        <Grid item md={3} sm={6}>
                            <Button
                                variant="contained"
                                className="block w-full h-full"
                                color="primary"
                                onClick={createLaunchpad}
                            >
                                Create launchpad
                            </Button>
                        </Grid>
                        <Grid item md={3} sm={6}>
                            <Button
                                variant="contained"
                                className="block w-full h-full"
                                color="primary"
                                onClick={createFairLaunchpad}
                            >
                                Create Fairlaunch
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    )
}

export default CreateTokenComponent
