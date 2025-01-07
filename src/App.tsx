
import './App.css'
 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Route from './Route/Route';
import { useContext } from 'react';
import { ThemeProvider } from './Context/ThemeContext';
import { Tooltip } from 'react-tooltip'

function App() {
  const { dark } = (useContext(ThemeProvider) as any) 

  return (
    <div className={` mx-auto  ${dark ? 'bg-[#121212]' :'bg-[#FAFAFA]'}`}>
      <ToastContainer />
      <Route />
      <Tooltip id="my-tooltip" />

    </div>
  )
}

export default App