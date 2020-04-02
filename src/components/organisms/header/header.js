import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./header.sass"

const Header = ({ siteTitle }) => (
  <header>
    <Link to="/" className="site-title">
      {siteTitle}
    </Link>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
