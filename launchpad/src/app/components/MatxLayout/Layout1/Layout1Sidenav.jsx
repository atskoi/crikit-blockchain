import React from 'react'
import { useTheme, makeStyles } from '@material-ui/core/styles'

import Sidenav from '../../Sidenav/Sidenav'
import BottomArea from '../../Sidenav/BottomArea'
import Brand from '../../Brand/Brand'
import { convertHexToRGB } from 'utils'
import useSettings from 'app/hooks/useSettings'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    sidenav: ({ width, primaryRGB, bgImgURL }) => ({
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: width,
        borderRight: '1px solid rgba(30, 30, 30, 0.06)',
        zIndex: 111,
        overflow: 'hidden',
        transition: 'all 250ms ease-in-out',
        background: '#1a2e3b',
        // background: '#ffffff',
        '&:hover': {
            width: 'var(--sidenav-width)',
            '& .sidenavHoverShow': {
                display: 'block',
            },
            '& .compactNavItem': {
                width: '100%',
                maxWidth: '100%',
                '& .nav-bullet': {
                    display: 'block',
                },
                '& .nav-bullet-text': {
                    display: 'none',
                },
            },
        },
    }),
    hideOnCompact: {
        display: 'none',
    },
    userInfo: {},
}))

const Layout1Sidenav = () => {
    const theme = useTheme()

    const { settings } = useSettings()

    const leftSidebar = settings.layout1Settings.leftSidebar
    const { mode } = leftSidebar

    const getSidenavWidth = () => {
        switch (mode) {
            case 'compact':
                return 'var(--sidenav-compact-width)'
            default:
                return 'var(--sidenav-width)'
        }
    }

    const primaryRGB = convertHexToRGB(theme.palette.primary.main)
    const classes = useStyles({
        ...leftSidebar,
        width: getSidenavWidth(),
        primaryRGB,
    })

    return (
        <div className={classes.sidenav}>
            <div className="relative h-full">
                <div
                    className="flex-column relative h-full"
                    style={{ paddingBottom: '50px' }}
                >
                    <Brand />
                    <Sidenav />
                </div>
                <BottomArea />
            </div>
        </div>
    )
}

export default React.memo(Layout1Sidenav)
