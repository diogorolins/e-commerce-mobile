import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDto } from "../../models/produto.dto";

@Injectable()
export class CartService {
  
  constructor(public storage: StorageService){
  }

  createOrClearCart(): Cart{
    let cart: Cart = {items: []};
    this.storage.setCart(cart);
    return cart;
  }

  getCart(){
    let cart: Cart = this.storage.getCart();    
    
    if(cart == null){
      cart = this.createOrClearCart();
    }
    return cart;
  }

  addProduto(produto: ProdutoDto): Cart {
    let cart: Cart = this.getCart();
    
    let position = cart.items.findIndex(x => x.produto.id ==  produto.id);
    if(position == -1) {
      cart.items.push({quantidade:1, produto: produto});
    } 
    this.storage.setCart(cart);
    return cart;
  }

  removeProduto(produto: ProdutoDto): Cart {
    let cart: Cart = this.getCart();

    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    if (position != -1) {
      cart.items.splice(position,1);
    }
    this.storage.setCart(cart);
    return cart;
  }

  increaseQuantity(produto: ProdutoDto): Cart {
    let cart: Cart = this.getCart();

    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    if (position != -1) {
      cart.items[position].quantidade++;
    }
    this.storage.setCart(cart);
    return cart;
  }

  decreaseQuantity(produto: ProdutoDto): Cart {
    let cart: Cart = this.getCart();

    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    if (position != -1) {
      cart.items[position].quantidade--;
      if(cart.items[position].quantidade < 1){
        cart = this.removeProduto(produto);
      }
    }
    this.storage.setCart(cart);
    return cart;
  }

  total(): number {
    let cart: Cart = this.getCart();
    let sum = 0;
    for (var i=0 ; i<cart.items.length; i++) {
      sum += cart.items[i].produto.price *  cart.items[i].quantidade;
    }
    return sum;
  }

}