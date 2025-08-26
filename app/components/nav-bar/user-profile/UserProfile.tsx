"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./UserProfile.module.scss";

function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else {
    return (
      <>
        <button onClick={() => signIn()}>Sign in with Strava</button>
      </>
    );
  }
}

export default function UserProfile() {
  const { data: session } = useSession(),
    userName = session?.user?.name ?? "Not signed In";

  return (
    <div className={styles.userProfile}>
      <div className={styles.userIcon}>
        {session && (
          <img
            className={styles.icon}
            src={session?.user?.image ?? ""}
            alt={userName}
          />
        )}
      </div>
      <div>{userName}</div>
      <AuthButton />
    </div>
  );
}
