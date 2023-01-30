import React from 'react'
import { Link } from 'react-router-dom'

let NavBar = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
        <div className="container row">
          <Link to={'/'} className="navbar-brand">
            <img
              src="https://cwservices.com/wp-content/uploads/2019/03/CWServices_LOGO_1-1.png"
              class="img-pic me-3"
              alt="..."
            />
            <h4>
              Vendor <span className="text-warning">Manager</span>
            </h4>
          </Link>
        </div>
      </nav>
    </React.Fragment>
  )
}
export default NavBar
