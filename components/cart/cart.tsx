import { getCart } from "@/lib/db/cart";
// import { formatPrice } from "@/lib/format";
import CartEntry from "../../components/cart/cart-entry";
import { setProductQuantity } from "@/lib/utils/actions";
import { Button } from "@/components/ui/button/button";
import styles from "./cart.module.scss";

export const metadata = {
  title: "Your Cart - Noorulla",
};

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.title}>Shopping Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          cartItem={cartItem}
          key={cartItem.id}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.items.length && (
        <p className={styles.emptyCart}>Your cart is empty.</p>
      )}
      <div className={styles.summary}>
        <p className={styles.total}>Total: {cart?.subtotal || 0}</p>
        <Button className={styles.checkoutButton}>Checkout</Button>
      </div>
    </div>
  );
}
