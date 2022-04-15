import React, {useMemo} from "react";
import {ToastContainer} from "react-toastify";
import {BrowserRouter, Route} from "react-router-dom";
import RootContainer from "./RootContainer";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {configureStore} from "../store/configureStore";
import 'react-toastify/dist/ReactToastify.css';

export default function AppContainer() {
    const store = useMemo(() => configureStore(), []);

    if (!store) {
        return null;
    }
    return (
        <Provider store={store.store}>
            <PersistGate persistor={store.persistor}>
                <BrowserRouter>
                    <>
                        <Route component={RootContainer}/>
                        <ToastContainer/>
                    </>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}
