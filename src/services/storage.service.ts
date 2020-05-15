import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_key.config";
import { Cart } from "../models/cart";

@Injectable()
export class StorageService{

  getLocalUser() : LocalUser {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if(!usr)
      return null;

    return JSON.parse(usr);
  }

  setLocalUser(obj: LocalUser){
    if(!obj)
      localStorage.removeItem(STORAGE_KEYS.localUser);
    localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
  }

  getCart(): Cart {
    let cart = localStorage.getItem(STORAGE_KEYS.cart);
    if (!cart)
      return null;

    return JSON.parse(cart);
  }

  setCart(obj: Cart) {
    if (!obj)
      localStorage.removeItem(STORAGE_KEYS.cart);
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
  }
}