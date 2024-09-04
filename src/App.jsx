import { Route, Routes } from 'react-router-dom'
import './App.css'
import './index.css'
import './global.css'
import { createContext, lazy, Suspense, useState } from 'react'
import Layout from './Layout/Layout'
export const ThemeContext = createContext();
export const Widget = createContext();


const SignPage = lazy(() => import('./Pages/sign'))
const HomePage = lazy(() => import('./Pages/Home'))


function App() {

  const [theme, setTheme] = useState();
  const [widgete, setWidget] = useState();

  return (
    <>
    <Suspense fallback={<h1>Loading...</h1>}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
      <Widget.Provider value={{ widgete, setWidget }}>
      <Routes>
        <Route path='/' element={<SignPage />} />
        <Route path='/Home' element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
      </Widget.Provider>
      </ThemeContext.Provider>
    </Suspense>
    </>
  )
}

export default App
