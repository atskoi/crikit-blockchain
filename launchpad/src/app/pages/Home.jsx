import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

let dashboard_area_mounted
const Home = () => {
    const selector = useSelector((state) => state)
    const connection = selector.connection
    const [launchpadInfo, setLaunchpadInfo] = React.useState({})
    const getInfo = async () => {
    }
    useEffect(() => {
        dashboard_area_mounted = true

        getInfo()

        return () => {
            dashboard_area_mounted = false
        }
    }, [])

    return (
        <div id="fullpage">
        </div>
    )
}

export default Home
