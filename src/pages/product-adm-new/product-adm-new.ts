import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaDTO } from '../../models/categoria.dto';
import { CategoriaService } from '../../services/domain/categoria.service';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { AlertService } from '../../services/alert.service';

@IonicPage()
@Component({
  selector: 'page-product-adm-new',
  templateUrl: 'product-adm-new.html',
})
export class ProductAdmNewPage {

  categorias: CategoriaDTO[] = [];
  produto: ProdutoDTO = {id:null, name:null, price:null};
  categoriasCombo: string[] =  [];
  categoriasSelected: CategoriaDTO[] = [];
  parentPage = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    public produtoService: ProdutoService,
    public alertService: AlertService
    ) {
    
  }

  ionViewDidLoad() {  
    this.parentPage = this.navParams.get("parentPage");  
    if (this.navParams.get("product")) {
      this.produto = this.navParams.get("product");
      this.produto.categories.forEach(e => {
        this.categoriasCombo.push(e.id);
      })
    }  
    this.loadCategories();
    
  }

  loadCategories() {    
    this.categoriaService.findAll()
      .subscribe(response => {
        response.forEach(element => {
          this.categorias = response;  
        })       
      }, error => { });    
  }

  submitForm() {    
    if (this.navParams.get("product")) {
      this.alterProduct();
    } else {
      this.createProduct();
    }    
  }

  createProduct() {       
    this.convertCategories(this.categoriasCombo);
    this.produto.categories = this.categoriasSelected;
   
    let retorno = this.checkFormData(this.produto);
    if (retorno == "") {
      this.produtoService.insert(this.produto)
        .subscribe(response => {
          let objAlert = {title: "Sucesso", message: "Produto inserido com sucesso"};
          this.alertService.showAlert(objAlert);
          this.parentPage.chargeProducts();
          this.navCtrl.pop();
        }, error => { });
    } else {
      let objAlert = {title: "Validação", message: retorno};
      this.alertService.showAlert(objAlert);
      this.loadCategories();
    }
  }

  alterProduct() {
    this.convertCategories(this.categoriasCombo);
    this.produto.categories = this.categoriasSelected;
    let retorno = this.checkFormData(this.produto);     
    if (retorno == "") {
      this.produtoService.update(this.produto)
        .subscribe(response => {
          let objAlert = { title: "Sucesso", message: "Produto alterado com sucesso" };
          this.alertService.showAlert(objAlert);
          this.parentPage.chargeProducts();
          this.navCtrl.pop();
        }, error => { });
    } else {
      let objAlert = { title: "Validação", message: retorno };
      this.alertService.showAlert(objAlert);
      this.loadCategories();
    }
  }


  convertCategories(combo){
    if(combo) {
      for (let i = 0; i < combo.length; i++) {
        this.categoriasSelected.push({ id: combo[i], name: "" });
      }
    }
  }

  checkFormData(produto){
    let retorno = "";
    if (!produto.name){
      retorno = "Nome obrigatório";
    } else if (!produto.price || isNaN(this.produto.price)) {
      retorno = "Preço inválido";
    } else if (produto.categories.length < 1) {
      retorno = "Pelo menos 1 categoria";
    }  else {
      retorno = "";
    }
    return retorno;
  }

}
