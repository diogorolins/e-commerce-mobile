import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoService } from '../../services/domain/produto.service';
import { ProdutoDTO } from '../../models/produto.dto';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { AlertService } from '../../services/alert.service';



@IonicPage()
@Component({
  selector: 'page-product-adm',
  templateUrl: 'product-adm.html',
})
export class ProductAdmPage {

  categoriaId: string;
  produtos: ProdutoDTO[];
  categorias: CategoriaDTO[];
  alterOk: boolean = true;
  deleteOk: boolean = true; 
 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public categoriaService: CategoriaService,
    public alert: AlertService) {
  }

  ionViewDidLoad() {
    this.loadCategories();
  }

  chargeProducts(){
    if (this.categoriaId != "") {
      this.produtoService.findByCategoria(this.categoriaId, 0, 100)
        .subscribe(response => {
          this.produtos = response["content"];
        },
          error => { this.produtos = null; });
    }   
  }

  loadCategories() {
    this.categoriaService.findAll()
      .subscribe(response => {
        this.categorias = response;
      },
        error => { })
  }

  confirmDelete(){  
    this.sendConfirmation();
  }

  deleteProduct(){
    let checkedProducts = this.getSelected(this.produtos);
    checkedProducts.forEach(e => {
      this.produtoService.remove(e.id)
        .subscribe(
          response => { 
            this.chargeProducts();
          },
          error => {}
        );          
    });         
  }

  enableAlter(id:string) {
    let checkedProducts = this.getSelected(this.produtos);
    if (checkedProducts.length == 1){
      this.alterOk = false;
      this.deleteOk = false;
    } else if (checkedProducts.length > 1){
      this.alterOk = true;
      this.deleteOk = false;
    } else {
      this.deleteOk = true;
      this.alterOk = true;
    }
  }

  goToNew() {    
    this.navCtrl.push("ProductAdmNewPage", { parentPage: this });    
  }

  goToAlter() {
    let checkedProducts = this.getSelected(this.produtos);
    this.navCtrl.push("ProductAdmNewPage", { product: checkedProducts[0], parentPage: this })
  }

  sendConfirmation() {
    let objConfirm = {
      title: "Confirmação",
      message: "Tem certeza que deseja apagar os produtos selecionados?",
      event: () => { this.deleteProduct(); }
    }
    this.alert.showConfirmation(objConfirm);     
  }

  back() {
    this.navCtrl.setRoot("AdminMenuPage");
  }

  getSelected(object) {
    return object.filter(e => e["selected"] == true);
  }

}
