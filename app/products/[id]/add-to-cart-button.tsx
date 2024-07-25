"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button/button";
import { ShoppingCart } from "lucide-react";
import styles from "./add-to-cart-button.module.scss";

interface AddToCartButtonProps {
  productId: string;
  incrementProductQuantity: (productId: string) => Promise<void>;
}

export default function AddToCartButton({
  productId,
  incrementProductQuantity,
}: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className={styles.container}>
      <Button
        className={styles.button}
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity(productId);
            setSuccess(true);
          });
        }}
        disabled={isPending}
      >
        Add to Cart
        <ShoppingCart className={styles.icon} />
      </Button>
      {isPending && <span className={styles.spinner} />}
      {!isPending && success && (
        <span className={styles.successMessage}>Added to Cart.</span>
      )}
    </div>
  );
}
