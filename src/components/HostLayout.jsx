import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const getActiveClass = ({ isActive }) => (isActive ? "active-link" : "");

export default function HostLayout() {
  

  return (
    <>
      <nav className="host-nav">
        <NavLink to="/host" className={getActiveClass} end>
          Dashboard
        </NavLink>
        <NavLink to="/host/income" className={getActiveClass}>
          Income
        </NavLink>
        <NavLink to="/host/vans" className={getActiveClass}>
          Vans
        </NavLink>
        <NavLink to="/host/reviews" className={getActiveClass}>
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
