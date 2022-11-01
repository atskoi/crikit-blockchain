import { makeStyles } from '@material-ui/core/styles'

export const customStyles = makeStyles(({ palette, ...theme }) => ({
    '@global': {
        '.body_container': {
            maxWidth: '1200px',
            margin: '2.5rem auto',
            color: '#FFFFFF',
            '@media (max-width:1420px)': {
                marginLeft: '10px',
                marginRight: '10px',
            },
        },
        '.body_card_container': {
            margin: '20px 10px',
            padding: '40px 30px',
            [theme.breakpoints.down('md')]: {
                margin: '10px',
                padding: '25px 15px',
            },
            [theme.breakpoints.down('sm')]: {
                margin: '10px 0',
                padding: '25px 15px',
            },
        },
        '.ms-200px': {
            [theme.breakpoints.up('sm')]: {
                width: '200px',
            },
        },
        '.sm-100px': {
            [theme.breakpoints.down('sm')]: {
                width: '110px',
            },
        },
        '.stepper_container': {
            margin: '20px',
            padding: '40px 30px',
            backgroundColor: 'transparent',
            [theme.breakpoints.down('md')]: {
                margin: '10px',
                padding: '25px 15px',
            },
        },
        '.h8': {
            height: '2rem',
        },
        '.w8': {
            width: '2rem',
        },
        '.inline-flex': {
            display: 'inline-flex',
        },
        '.position-absolute': {
            position: 'absolute',
        },
        '.helpTxt': {
            color: '#00adef',
            fontSize: '12px',
            margin: '4px 10px 0px',
        },
        '.fs-28px': {
            fontSize: '28px',
        },
        '.fs-24px': {
            fontSize: '24px',
        },
        '.text-grey': {
            color: 'grey',
        },
        '.bg-light-success': {
            backgroundColor: 'lightgreen',
        },
        '.text-success': {
            color: 'darkgreen',
        },
        '.loading-icon': {
            marginRight: '5px',
        },
        '.kyc_verified': {
            backgroundColor: 'lightgreen',
            padding: '5px',
            display: 'flex',
            fontSize: '10px',
            borderRadius: '3px',
        },
        '.kyc_verified.audit': {
            backgroundColor: 'lightblue',
            padding: '5px',
            display: 'flex',
            fontSize: '10px',
            borderRadius: '3px',
        },
        '.modalContainer': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 500,
            maxHeight: '100vh',
            overflow: 'auto',
            width: '100%',
            backgroundColor: '#1a2e3b',
            padding: 0,
            borderRadius: '10px',
        },
        '.modalTitle': {
            fontSize: '22px',
            padding: '20px 20px 10px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        '.modalCloseBtn': {
            cursor: 'pointer',
            color: '#555',
            fontSize: '18px',
        },
        '.modalBody': {
            padding: '20px',
        },
        '.border-secondary': {
            border: '1px solid #663c00',
        },
        '.hr': {
            color: '#eeeeee',
        },
        '.card_title_label': {
            fontSize: '22px',
            fontWeight: '600',
        },
        '.loadingIcon': {
            marginRight: '5px',
        },
        '.tableTd': {
            border: '1px solid #dbdbdb',
            padding: '10px',
        },
        '.w-150': {
            width: '150px',
        },
        '.w-50': {
            width: '50px',
        },
        '.CircularProgressbar-path': {
            stroke: '#bf1e2e !important',
        },
        '.CircularProgressbar-text': {
            fill: '#bf1e2e !important',
        },
        '.underline': {
            textDecoration: 'underline',
        },
        '.font-weight-bold': {
            fontWeight: 'bold',
        },
        '.tableTdWithOutBorder': {
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid #dbdbdb',
            padding: '10px 0px',
        },
        '.sidebar-item-color': {
            color: '#FFFFFF',
        },
    },
}))
