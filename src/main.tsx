import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'
import { MetaMaskProvider } from "@metamask/sdk-react";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <MetaMaskProvider
            debug={false}
            sdkOptions={{
                dappMetadata: {
                    name: "Example React Dapp",
                    url: window.location.href,
                },
                // Other options
            }}
        >
         {/*注入store*/}
        <Provider store={store}>

                <App />

        </Provider>
        </MetaMaskProvider>
    </BrowserRouter>

)
