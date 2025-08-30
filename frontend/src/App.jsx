import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UploadCSV from './components/UploadCSV'
import { Link } from 'react-router-dom'
// import showController from '../../backend/controller/showController'
import ShowAllRecords from './components/ShowAllRecords'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { Link } from 'react-router-dom'
import Routers from './utility/Routers'
import NavBar from './components/NavBar'
// import BasicTable from './components/BasicTable'

function App() {
 
  const [count, setCount] = useState(0)

 return (<>
<ReactQueryDevtools initialIsOpen={false} />

<NavBar/>
<Routers/>
{/* <UploadCSV /> */}
{/* <showController/> */}
{/* <ShowAllRecords/> */}

{/* <BasicTable/> */}

 </>)
}

export default App
