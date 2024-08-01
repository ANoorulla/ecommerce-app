"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button/button";
import styles from "./page.module.scss";

interface UserData {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

const UserDashboard: React.FC = () => {
  const { data: session, status } = useSession();
  console.log("sess", session);

  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  console.log(userData);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user) {
      fetchUserData();
    }
  }, [status, session, router]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user");
      if (response.ok) {
        const data: UserData = await response.json();
        setUserData(data);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Welcome to Your Dashboard</h1>
      <div className={styles.userInfo}>
        <h2 className={styles.subtitle}>User Information</h2>
        <p className={styles.info}>Username: {userData?.username}</p>
        <p className={styles.info}>Email: {session.user.email}</p>
        {userData && (
          <p className={styles.info}>
            Account Created: {new Date(userData.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
      <div className={styles.actions}>
        <Button
          onClick={() => router.push("/edit-profile")}
          className={styles.button}
        >
          Edit Profile
        </Button>
        <Button
          onClick={() => router.push("/change-password")}
          className={styles.button}
        >
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default UserDashboard;
