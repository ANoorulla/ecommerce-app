import ProductCard from "@/components/products/product-card";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import styles from "./page.module.scss";

interface SearchPageProps {
  searchParams: { query: string };
}

export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `Search: ${query} - Noorulla`,
  };
}

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });

  return (
    <div className={styles.container}>
      {products.length === 0 ? (
        <div className={styles.noResults}>No products found</div>
      ) : (
        <div className={styles.searchResults}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCardWrapper}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
