import {createContext, useContext} from "react";
import CommonStore from "./common/commonStore";
import UserStore from "./user/userStore";
import ProductStore from "./product/productStore.ts";

export default interface Store {
    userStore: UserStore,
    commonStore: CommonStore,
    productsStore: ProductStore,

}

export const store: Store = {
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    productsStore: new ProductStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext);
}