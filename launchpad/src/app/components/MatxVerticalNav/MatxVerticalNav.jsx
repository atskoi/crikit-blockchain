import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from '@material-ui/core'
import TouchRipple from '@material-ui/core/ButtonBase'
import MatxVerticalNavExpansionPanel from './MatxVerticalNavExpansionPanel'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import useSettings from 'app/hooks/useSettings'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    navItem: {
        color: '#000000',
        transition: 'all 150ms ease-in',
        borderRight: '4px solid transparent',
        '&:hover': {
            backgroundColor: '#6ddc00',
        },
    },
    navItemActive: {
        // backgroundColor: '#ede9dd',
        backgroundColor: palette.primary.main,
        borderColor: palette.primary.main,
        // color: palette.text.main,
        color: palette.text.primary,
    },
    compactNavItem: {
        overflow: 'hidden',
        justifyContent: 'center !important',
        paddingLeft: '10px',
        '& $itemText': {
            display: 'none',
        },
        '& $itemIcon': {
            display: 'none',
        },
    },
    itemIcon: {},
    itemText: {
        fontSize: '0.875rem',
        paddingLeft: '0.8rem',
    },
    label: {
        color: palette.text.secondary,
    },
    bulletIcon: {
        background: '#e1e4e5',
        // background: palette.text.primary,
    },
}))

const MatxVerticalNav = ({ items }) => {
    const { settings } = useSettings()
    const { mode } = settings.layout1Settings.leftSidebar
    const classes = useStyles()

    const renderLevels = (data) => {
        return data.map((item, index) => {
            if (item.type === 'label')
                return (
                    <p
                        key={index}
                        className={clsx({
                            'px-4 mb-2 mt-6 uppercase text-12 sidenavHoverShow': true,
                            [classes.label]: true,
                            hidden: mode === 'compact',
                        })}
                    >
                        {item.label}
                    </p>
                )
            if (item.children) {
                return (
                    <MatxVerticalNavExpansionPanel
                        mode={mode}
                        item={item}
                        key={index}
                    >
                        {renderLevels(item.children)}
                    </MatxVerticalNavExpansionPanel>
                )
            } else if (item.type === 'extLink') {
                return (
                    <a
                        key={index}
                        href={item.path}
                        className={clsx({
                            'flex justify-between h-44 mb-2 compactNavItem whitespace-pre overflow-hidden': true,
                            [classes.navItem]: true,
                            [classes.compactNavItem]: mode === 'compact',
                        })}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <TouchRipple
                            key={item.name}
                            name="child"
                            className="w-full"
                        >
                            {(() => {
                                if (item.icon) {
                                    return (
                                        <Icon className="text-18 align-middle px-4 sidebar-item-color">
                                            {item.icon}
                                        </Icon>
                                    )
                                } else {
                                    return (
                                        <span className="item-icon icon-text sidebar-item-color">
                                            {item.iconText}
                                        </span>
                                    )
                                }
                            })()}
                            <span
                                className={clsx(
                                    'align-middle sidenavHoverShow sidebar-item-color',
                                    classes.itemText
                                )}
                            >
                                {item.name}
                            </span>
                            {item.badge && (
                                <Icon className="text-14 align-middle px-3 sidebar-item-color">
                                    {item.badge}
                                </Icon>
                            )}
                            <div className="mx-auto" />
                        </TouchRipple>
                    </a>
                )
            } else {
                return (
                    <NavLink
                        key={index}
                        to={item.path}
                        activeClassName={classes.navItemActive}
                        className={clsx({
                            'flex justify-between h-44 mb-2 compactNavItem whitespace-pre overflow-hidden': true,
                            [classes.navItem]: true,
                            [classes.compactNavItem]: mode === 'compact',
                        })}
                    >
                        <TouchRipple
                            key={item.name}
                            name="child"
                            className="w-full"
                        >
                            {item?.icon ? (
                                <Icon className="text-18 align-middle w-36 px-4 sidebar-item-color">
                                    {item.icon}
                                </Icon>
                            ) : (
                                <Fragment>
                                    <div
                                        className={clsx({
                                            'nav-bullet p-2px rounded ml-6 mr-2 sidebar-item-color': true,
                                            [classes.bulletIcon]: true,
                                            hidden: mode === 'compact',
                                        })}
                                    ></div>
                                    <div
                                        className={clsx({
                                            'nav-bullet-text ml-5 text-11 sidebar-item-color': true,
                                            hidden: mode !== 'compact',
                                        })}
                                    >
                                        {item.iconText}
                                    </div>
                                </Fragment>
                            )}
                            <span
                                className={clsx(
                                    'align-middle text-left sidenavHoverShow sidebar-item-color',
                                    classes.itemText
                                )}
                            >
                                {item.name}
                            </span>
                            <div className="mx-auto"></div>
                            {item.badge && (
                                <div
                                    className={clsx(
                                        `rounded bg-${item.badge.color} px-1 py-1px`,
                                        'sidenavHoverShow',
                                        classes.itemIcon
                                    )}
                                >
                                    {item.badge.value}
                                </div>
                            )}
                        </TouchRipple>
                    </NavLink>
                )
            }
        })
    }

    return <div className="navigation">{renderLevels(items)}</div>
}

export default React.memo(MatxVerticalNav)
