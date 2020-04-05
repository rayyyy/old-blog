import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from "./header.module.sass"

const Header = ({ siteTitle }) => (
  <header>
    <Link to="/" className={styles.title} >
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
