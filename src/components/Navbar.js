import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';

export const Navbar = () => {
  let location = useLocation();
  let history = useHistory();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/'>
            iNotebook
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current='page' to='/'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to='/about'>
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? (
              <div className='d-flex'>
                <Link to='/login' className='btn btn-primary mx-1' role='button'>
                  Login
                </Link>
                <Link to='/signup' className='btn btn-primary mx-1' role='button'>
                  Sign Up
                </Link>
              </div>
            ) : (
              <button type='button' onClick={handleLogOut} class='btn btn-primary'>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
