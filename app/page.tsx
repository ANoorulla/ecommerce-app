import ProductCard from "@/components/products/product-card";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <div className={styles.hero_content}>
          <Image
            src={products[0].imageUrl}
            alt={products[0].name}
            width={400}
            height={800}
            className={styles.image}
            priority
          />
          <div className={styles.content}>
            <h1 className={styles.name}>{products[0].name}</h1>
            <p className={styles.description}>{products[0].description}</p>
            <Link href={"/products/" + products[0].id} className={styles.link}>
              Check it out
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.product_grid}>
        {products.slice(1).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
