"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button/button";
import { ShoppingCart } from "lucide-react";
import styles from "./add-to-cart-button.module.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  productId: string;
  incrementProductQuantity: (productId: string) => Promise<void>;
}

export default function AddToCartButton({
  productId,
  incrementProductQuantity,
}: AddToCartButtonProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  const handleAddToCart = () => {
    if (status === "authenticated") {
      setSuccess(false);
      startTransition(async () => {
        await incrementProductQuantity(productId);
        setSuccess(true);
      });
    } else {
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <Button
        className={styles.button}
        onClick={handleAddToCart}
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
