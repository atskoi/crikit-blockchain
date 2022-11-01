import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    brand: {
        padding: '0',
        marginBottom: '10px',
    },
    hideOnCompact: {
        display: 'none',
    },
    logoImg: {
        width: '100%',
        // height: "60px",
        margin: 'auto',
    },
}))

const Brand = () => {
    const classes = useStyles()

    return (
        <div
            className={clsx('flex items-center justify-between', classes.brand)}
        >
            <div className="flex items-center">
                <Link to="/">
                    Home
                </Link>
            </div>
        </div>
    )
}

export default Brand
