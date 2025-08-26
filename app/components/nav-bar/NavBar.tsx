"use client";

import NavMenu from "./user-profile/UserProfile";
import styles from "./NavBar.module.scss";

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.links}>
        <a>My Routes</a>
        <a>My Activities</a>
      </div>
      <NavMenu />
    </nav>
  );
}

export default NavBar;
