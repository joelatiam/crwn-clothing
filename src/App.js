import {Routes, Route} from 'react-router-dom';

import Navigation from './components/routes/navigation/navigation.component';
import Home from './components/routes/home/home.component'

const App = () =>{
  return (
    <Routes>
    <Route path='/' element={<Navigation/>}>
      <Route index={true} element={<Home/>} />
    </Route>
    </Routes>
  )
}

export default App;
