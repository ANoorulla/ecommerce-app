import AddProductForm from "@/components/add-product-form/add-product-form";
import { addProduct } from "@/lib/utils/addProductAction";
import styles from "./page.module.scss";

export default function AddProductPage() {
  return (
    <div className={styles.add_product}>
      <h1 className={styles.add_product_title}>Add Product</h1>
      <AddProductForm addProduct={addProduct} />
    </div>
  );
}
