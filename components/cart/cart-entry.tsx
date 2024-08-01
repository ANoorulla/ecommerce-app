"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
// import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { Separator } from "@/components/ui/separator/separator";
import styles from "./cart-entry.module.scss";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({
  cartItem: { product, quantity },
  setProductQuantity,
}: CartEntryProps) {
  const [isPending, startTransition] = useTransition();

  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <SelectItem value={i.toString()} key={i}>
        {i}
      </SelectItem>
    );
  }

  return (
    <div className={styles.cartEntry}>
      <div className={styles.content}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className={styles.image}
        />
        <div className={styles.details}>
          <Link href={"/products/" + product.id} className={styles.productName}>
            {product.name}
          </Link>
          <div className={styles.price}>Price: {product.price}</div>
          <div className={styles.quantitySelector}>
            Quantity:
            <Select
              defaultValue={quantity.toString()}
              onValueChange={(value) => {
                const newQuantity = parseInt(value);
                startTransition(async () => {
                  await setProductQuantity(product.id, newQuantity);
                });
              }}
            >
              <SelectTrigger className={styles.selectTrigger}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 (Remove)</SelectItem>
                {quantityOptions}
              </SelectContent>
            </Select>
          </div>
          <div className={styles.total}>
            Total: {product.price * quantity}
            {isPending && <span className={styles.spinner} />}
          </div>
        </div>
      </div>
      <Separator className={styles.separator} />
    </div>
  );
}
