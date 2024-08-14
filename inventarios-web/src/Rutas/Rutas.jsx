import React from 'react'
import { Routes,Route } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Productos from './Paginas/Productos'
import Catalogo from './Paginas/Catalogo'
import Provedores from './Paginas/Provedores'
import Inicio from './Paginas/Inicio'
import Graficas from './Paginas/Graficas'



const Rutas = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<NavBar/>}>
        <Route path='/' element={<Inicio/>}/>
        <Route path='/Productos' element={<Productos/>}/>
        <Route path='/Catalogo' element={<Catalogo/>}/>
        <Route path='/Provedores' element={<Provedores/>}/>
        <Route path='/Graficas' element={<Graficas/>}/>
        </Route>
      </Routes>
    </div>
  )
}




export default Rutas
