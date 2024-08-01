"use client";

import { Suspense, useEffect, useState } from "react";
import NavbarContent from "./nav-bar-content";
import { ShoppingCart } from "@/lib/db/cart";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import styles from "./nav-bar.module.scss";

interface NavbarProps {
  cart: ShoppingCart | null;
  initialSession: Session | null;
}

export default function Navbar({ cart, initialSession }: NavbarProps) {
  const { data: sessionData } = useSession();
  const [session, setSession] = useState<Session | null>(initialSession);

  useEffect(() => {
    if (sessionData) {
      setSession(sessionData);
    }
  }, [sessionData]);

  return (
    <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
      <NavbarContent cart={cart} session={session} />
    </Suspense>
  );
}
