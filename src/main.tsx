import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        {/* 注入store */}
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)
