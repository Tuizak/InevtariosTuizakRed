import React from 'react'
import {Link, Outlet } from "react-router-dom"

const NavBar = () => {
  return (
    <div>
      <nav>
        <ul>
            <li> <Link to="/">Inicio</Link> </li>
            <li> <Link to="/Productos">Productos</Link></li>
            <li> <Link to="/Catalogo">Catalogo</Link></li>
            <li> <Link to="/Provedores"> Provedores</Link></li>
            <li> <Link to="/Graficas"> Graficas</Link></li>
        </ul>
      </nav>
      <Outlet/>
    </div>
  )
}

export default NavBar
