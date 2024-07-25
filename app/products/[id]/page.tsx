import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import styles from "./page.module.scss";
import AddToCartButton from "./add-to-cart-button";
import { incrementProductQuantity } from "./actions";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: product.name + " - Noorulla",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);
  return (
    <div className={styles.product_container}>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className={styles.product_image}
        priority
      />
      <div className={styles.product_info}>
        <h1 className={styles.product_name}>{product.name}</h1>
        <p className={styles.price_tag}>${product.price}</p>
        <p className={styles.product_description}>{product.description}</p>
        <AddToCartButton
          productId={product.id}
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </div>
  );
}
