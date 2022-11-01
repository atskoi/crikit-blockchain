import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import RootReducer from './reducers/RootReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {}
const middlewares = [thunk]
let devtools = (x) => x

const persistConfig = {
    key: 'root',
    storage: storage,
}

const persistedReducer = persistReducer(persistConfig, RootReducer)
if (
    process.env.NODE_ENV !== 'production' &&
    process.browser &&
    window.__REDUX_DEVTOOLS_EXTENSION__
) {
    devtools = window.__REDUX_DEVTOOLS_EXTENSION__()
}

export const Store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middlewares), devtools)
)

export const persistor = persistStore(Store)
