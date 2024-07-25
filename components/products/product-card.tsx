import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import styles from "./product-card.module.scss";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isNew = Date.now() - new Date(product.createdAt).getTime();
  1000 * 60 * 60 * 24 * 7;

  return (
    <Link href={"/products/" + product.id} className={styles.product_card}>
      <figure className={styles.image_container}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={600}
          height={400}
        />
      </figure>
      <div className={styles.content}>
        <h2 className={styles.title}>{product.name}</h2>
        {isNew && <div className={styles.new_badge}>NEW</div>}
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product.price}</p>
      </div>
    </Link>
  );
}
