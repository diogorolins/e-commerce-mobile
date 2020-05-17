import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.services';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clientService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email)
      this.clientService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response["addresses"];
         
          let cart = this.cartService.getCart();
         
          this.pedido = {
            client: { id: response["id"]},
            address: null,
            payment: null,
            items: cart.items.map(item => {
                return { quantity: item.quantidade, product: { id:item.produto.id}}
            })
          }
        },
          error => {
            this.navCtrl.setRoot("HomePage")
          });
    else {
      this.navCtrl.setRoot("HomePage")
    }
  }

  nextPage(item: EnderecoDTO) {
    this.pedido.address = { id: item.id};
    this.navCtrl.push("PaymentPage", {pedido: this.pedido})    
  }

}