import { combineReducers } from 'redux'
import ScrumBoardReducer from './ScrumBoardReducer'
import NotificationReducer from './NotificationReducer'
import EcommerceReducer from './EcommerceReducer'
import NavigationReducer from './NavigationReducer'
import ConnectionReducer from './ConnectionReducer'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const RootReducer = combineReducers({
    notifications: NotificationReducer,
    navigations: NavigationReducer,
    scrumboard: ScrumBoardReducer,
    ecommerce: EcommerceReducer,
    connection: persistReducer(
        { key: 'connectionState', storage },
        ConnectionReducer
    ),
})

export default RootReducer
