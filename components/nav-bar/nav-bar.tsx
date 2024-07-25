"use client";

import Link from "next/link";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import styles from "./nav-bar.module.scss";
import { searchProducts } from "@/lib/utils/search-actions";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <ShoppingBag className={styles.logoIcon} />
          <span>Noorulla</span>
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
          <Button variant="outline" className={styles.cartButton}>
            <ShoppingCart className={styles.cartIcon} />
            <span className={styles.cartCount}>{}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
