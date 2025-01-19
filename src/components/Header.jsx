import React from "react"
import {  Link, NavLink } from "react-router-dom"

import { getActiveClass } from "./HostLayout"

export default function Header() {
    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink to="/host" className={getActiveClass}>Host</NavLink>
                <NavLink to="/about" className={getActiveClass}>About</NavLink>
                <NavLink to="/vans" className={getActiveClass}>Vans</NavLink>
            </nav>
        </header>
    )
}