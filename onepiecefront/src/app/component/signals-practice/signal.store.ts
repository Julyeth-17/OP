import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"
import { Product } from "src/app/models/signal-card"

export interface CartState {
  products: Product[]
}

const initialState: CartState= {
  products: [],
}

export const CartStore = signalStore(
  withState(initialState),
  withMethods(({products, ...store}) => ({
    addToCart(product: Product){
      const updatedProduct = [...products(), product];
      patchState(store, {products: updatedProduct})
    },
    removeItemFromCart(id: number){
      const updatedProducts = products().filter(product => product.id === id)
      patchState(store, {products: updatedProducts});
    },
  }))
)
