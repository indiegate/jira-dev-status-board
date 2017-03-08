/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import rootReducer from './reducers';

import io from 'socket.io-client'
const socket = io();
const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

export default function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(
                socketIoMiddleware
            )
        )
    );

    if (module.hot) {
        // module.hot.accept('./epics', () => {
        //     epicMiddleware.replaceEpic(require('./epics').default); // eslint-disable-line global-require
        // });

        module.hot.accept('./reducers', () => {
            store.replaceReducer(require('./reducers')); // eslint-disable-line global-require
        });
    }

    return store;
}
