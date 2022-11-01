import React, { Fragment, useEffect, useState } from 'react'

let bottom_area_mounted
const BottomNav = () => {
    const [crikitPrice, setCrikitPrice] = React.useState(0)

    const getPrice = async () => {
    }
    useEffect(() => {
        bottom_area_mounted = true

        getPrice()

        return () => {
            bottom_area_mounted = false
        }
    }, [])

    return (
        <Fragment>
            <div className="menu_bottom_area">
                <div className="bottom_icons_area">
                </div>
            </div>
        </Fragment>
    )
}

export default BottomNav
