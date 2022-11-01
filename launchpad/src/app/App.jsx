import React from 'react'
import { Provider } from 'react-redux'
import { Router, Switch } from 'react-router-dom'
import AppContext from './contexts/AppContext'
import history from 'history.js'
import routes from './RootRoutes'
import { persistor, Store } from './redux/Store'
import { MatxTheme, MatxLayout } from 'app/components'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import { PersistGate } from 'redux-persist/integration/react'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

const App = () => {
    return (
        <AppContext.Provider value={{ routes }}>
            <Provider store={Store}>
                <PersistGate loading={null} persistor={persistor}>
                    <SettingsProvider>
                        <MatxTheme>
                            <Router history={history}>
                                <Switch>
                                    <MatxLayout />
                                </Switch>
                            </Router>
                        </MatxTheme>
                    </SettingsProvider>
                </PersistGate>
            </Provider>
        </AppContext.Provider>
    )
}

export default App
