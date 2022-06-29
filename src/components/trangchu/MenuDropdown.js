import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const MenuDropdown = (props) => {
    const { arrDropdownItem, dropdownId, title, routePath } = props
    const [isHover, setIsHover] = useState(false)
    return (
        <li
            className={`nav-item dropdown d-lg-flex ${isHover ? 'show' : ''}`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <NavLink
                to={`/${routePath}`}
                className={(navData) => {
                    return navData.isActive ? 'nav-link active' : 'nav-link'
                }}
            >
                <span>{title}</span>
            </NavLink>
            <a
                className="nav-link dropdown-toggle dropdown-toggle-split"
                id={dropdownId}
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={isHover ? 'true' : 'false'}
                data-reference="parent"
            >
                <span className="sr-only">Submenu</span>
            </a>
            <div
                className={`dropdown-menu ${isHover ? 'show' : ''}`}
                aria-labelledby="datve"
            >
                {arrDropdownItem.map((el, idx) => {
                    return (
                        <Link
                            key={idx}
                            className="dropdown-item"
                            to={`/${el.routePath}`}
                        >
                            {el.routeTitle}
                        </Link>
                    )
                })}
            </div>
        </li>
    )
}

export default MenuDropdown
