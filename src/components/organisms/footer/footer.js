import React from "react"
import styles from "./footer.module.sass"
import Image from "../../atoms/image"

const Header = () => (
  <footer className={styles.footer}>
    <a href="https://github.com/rayyyy" className={styles.icon}>
      <Image filename="github.png" />
    </a>
    <a href="https://twitter.com/rainiero_it" className={styles.icon}>
      <Image filename="twitter.png" />
    </a>
    <a href="https://old.rainiero.com/" className={styles.icon}>
      <Image filename="wordpress.png" />
    </a>
  </footer>
)

export default Header
