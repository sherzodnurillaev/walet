import { Route, Routes } from 'react-router-dom'
import './App.css'
import './index.css'
import './global.css'
import { createContext, lazy, Suspense, useState } from 'react'
import Layout from './Layout/Layout'
import Wallet from './Pages/Wallets'
export const ThemeContext = createContext();
export const Widget = createContext();
export const Sign = createContext();

const SignPage = lazy(() => import('./Pages/sign'))
const HomePage = lazy(() => import('./Pages/Home'))
const WalletPage = lazy(() => import('./Pages/Wallets'))
const ExchangePage = lazy(() => import('./Pages/Exchange'))


function App() {

  const [theme, setTheme] = useState();
  const [widgete, setWidget] = useState();
  const [sign, setSign] = useState(true);

  return (
    <>
    <Suspense fallback={<h1>Loading...</h1>}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
      <Widget.Provider value={{ widgete, setWidget }}>
      <Sign.Provider value={{ sign, setSign }}>
      <Routes>
        <Route path='/' element={<SignPage />} />
        <Route path='/Home' element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path='/Wallet' element={<Layout />}>
          <Route index element={<WalletPage />} />
        </Route>
        <Route path='/Exchange' element={<Layout />}>
          <Route index element={<ExchangePage />} />
        </Route>
      </Routes>
      </Sign.Provider>
      </Widget.Provider>
      </ThemeContext.Provider>
    </Suspense>
    </>
  )
}

export default App
