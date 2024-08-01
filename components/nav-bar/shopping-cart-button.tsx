"use client";

import { ShoppingCart } from "@/lib/db/cart";
// import { formatPrice } from "@/lib/format";
import Link from "next/link";
import styles from "./shopping-cart-button.module.scss";

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null;
}

export default function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
  function closeDropdown() {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  }

  return (
    <div className={styles.dropdownContainer}>
      <label tabIndex={0} className={styles.cartButton}>
        <div className={styles.indicator}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.cartIcon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className={styles.badge}>{cart?.size || 0}</span>
        </div>
      </label>
      <div tabIndex={0} className={styles.dropdownContent}>
        <div className={styles.cardBody}>
          <span className={styles.itemCount}>{cart?.size || 0} Items</span>
          <span className={styles.subtotal}>
            Subtotal: {cart?.subtotal || 0}
          </span>
          <div className={styles.cardActions}>
            <Link
              href="/cart"
              className={styles.viewCartButton}
              onClick={closeDropdown}
            >
              View cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
