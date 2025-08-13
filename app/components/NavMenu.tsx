"use client";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();
  debugger;
  if (session) {
    return (
      <>
        {session.user?.name}
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else {
    return (
      <>
        Not signed In
        <br />
        <button onClick={() => signIn()}>Sign in with Strava</button>
      </>
    );
  }
}

export default function NavMenu() {
  return (
    <div>
      <AuthButton />
    </div>
  );
}
