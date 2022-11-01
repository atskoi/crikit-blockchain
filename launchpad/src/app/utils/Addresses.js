export const FeeReceiver = '0x7542faCB7Ce585Bba159cD32b9d44EB25C68f7F0'
export const ZeroAddress = '0x0000000000000000000000000000000000000000'
export const PresaleFactoryAddress =
    '0x09Be4b0FCfA165f86d4E0aD54B38b4e4bc889a42'
export const PresaleReaderAddress = '0x4344F9C4fd2479c69ef958Cbb64521A32aAaC155'
export const StandardTokenFactoryAddress =
    '0xcd4473Fbd9c6c813e6cBeB279F51F4F07c1941De'
export const LiquidityGeneratorTokenFactoryAddress =
    '0x7B90a0A95cE6295Ea369091c3ec2b54Fc8438f69'
export const BabyTokenFactoryAddress =
    '0x3e619006Eb2d8944e230EfAfb908fd510645528e'
export const BuybackBabyTokenFactoryAddress =
    '0x43663112a8c3a4D73C29dA706742ce7541870FBf'
export const Fee = '0.01'

const CONTRACTS = {
    97: {
       
        StandardTokenFactory: '0x125B812d93aEE89Eee75ADfC55F181fcf0dD2F60',
    },
    56: {
        StandardTokenFactory: '0x1f3dC37D912C492568Fb102D61B540FB93eEaB27',
    },
}

export const FEES = {
    56: {
        Standard: '0.2',
        LiquidityGenerator: '0.2',
        BuybackBaby: '0.2',
    },
    97: {
        Standard: '0.2',
        LiquidityGenerator: '0.2',
        BuybackBaby: '0.2',
       
    },
}

export function getContract(chainId, label) {
    if (!CONTRACTS[chainId]) {
        throw new Error(`Incorrect chainId ${chainId}`)
    }
    if (!CONTRACTS[chainId][label]) {
        throw new Error(`Incorrect label "${label}" for chainId ${chainId}`)
    }
    return CONTRACTS[chainId][label]
}
