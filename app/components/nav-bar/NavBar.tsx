"use client";

import Link from "next/link";
import NavMenu from "./user-profile/UserProfile";
import styles from "./NavBar.module.scss";
import { usePathname } from "next/navigation";

function NavBar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.links}>
        <Link
          href="/routes"
          className={`${styles.link} ${
            pathname === "/routes" ? styles.active : ""
          }`}
        >
          My Routes
        </Link>
        <Link
          href="/activities"
          className={`${styles.link} ${
            pathname === "/activities" ? styles.active : ""
          }`}
        >
          My Activities
        </Link>
      </div>
      <NavMenu />
    </nav>
  );
}

export default NavBar;
