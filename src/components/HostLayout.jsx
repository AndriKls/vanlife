import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const getActiveClass = ({ isActive }) => (isActive ? "active-link" : "");

export default function HostLayout() {
  

  return (
    <>
      <nav className="host-nav">
        <NavLink to="." className={getActiveClass} end>
          Dashboard
        </NavLink>
        <NavLink to="income" className={getActiveClass}>
          Income
        </NavLink>
        <NavLink to="vans" className={getActiveClass}>
          Vans
        </NavLink>
        <NavLink to="reviews" className={getActiveClass}>
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
