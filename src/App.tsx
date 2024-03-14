import './App.css'
import GetRouters from './router'
import AuthRouter from './router/authRouter'

function App() {
    return (
        <div className='app-container'>
            <AuthRouter>
                <GetRouters />
            </AuthRouter>
        </div>
    )
}

export default App
