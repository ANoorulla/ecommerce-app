import Link from "next/link";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ShoppingBag, LogOut, User } from "lucide-react";
import styles from "./nav-bar-content.module.scss";
import { searchProducts } from "@/lib/utils/search-actions";
import ShoppingCartButton from "./shopping-cart-button";
import { ShoppingCart } from "@/lib/db/cart";
import { Session } from "next-auth";

interface NavbarContentProps {
  cart: ShoppingCart | null;
  session: Session | null;
}

export default function NavbarContent({ cart, session }: NavbarContentProps) {
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <ShoppingBag className={styles.logoIcon} />
          <span>Shopper</span>
        </Link>
        <div className={styles.actions}>
          <form action={searchProducts} className={styles.searchForm}>
            <Input
              name="searchQuery"
              placeholder="Search"
              className={styles.searchInput}
            />
            <Button type="submit" className={styles.searchButton}>
              Search
            </Button>
          </form>
          {session ? <ShoppingCartButton cart={cart} /> : null}
          {session ? (
            <form action="/api/auth/signout" method="POST">
              <Button
                type="submit"
                variant="outline"
                className={styles.logoutButton}
              >
                <LogOut className={styles.logoutIcon} />
                <span>Logout</span>
              </Button>
            </form>
          ) : (
            <Link href="/login">
              <Button variant="outline" className={styles.loginButton}>
                <User className={styles.loginIcon} />
                <span>Login</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
