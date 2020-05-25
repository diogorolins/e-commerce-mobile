import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaDTO } from '../../models/categoria.dto';
import { CategoriaService } from '../../services/domain/categoria.service';
import { AlertService } from '../../services/alert.service';

@IonicPage()
@Component({
  selector: 'page-category-adm-new',
  templateUrl: 'category-adm-new.html',
})
export class CategoryAdmNewPage {

  categoria: CategoriaDTO = { id:null, name: null};
  parentPage = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    public alertService: AlertService) {
  }

  ionViewDidLoad() {
    this.parentPage = this.navParams.get("parentPage");
    if (this.navParams.get("categoria")) {
      this.categoria = this.navParams.get("categoria");       
    }  
  }

  submitForm() {
    if (this.navParams.get("categoria")) {
      this.alterCategoria();
    } else {
      this.createCategoria();
    }
  }
  createCategoria() {
    let retorno = this.checkFormData(this.categoria);
    if (retorno == "") {
      this.categoriaService.insert(this.categoria)
        .subscribe(response => {
          let objAlert = { title: "Sucesso", message: "Categoria inserida com sucesso" };
          this.alertService.showAlert(objAlert);
          this.parentPage.loadCategories();
          this.navCtrl.pop();
        }, error => { });
    } else {
      let objAlert = { title: "Validação", message: retorno };
      this.alertService.showAlert(objAlert);
    }    
  }

  alterCategoria() {
    let retorno = this.checkFormData(this.categoria);
    if (retorno == "") {
      this.categoriaService.update(this.categoria)
        .subscribe(response => {
          let objAlert = { title: "Sucesso", message: "Categoria Alterada com sucesso" };
          this.alertService.showAlert(objAlert);
          this.parentPage.loadCategories();
          this.navCtrl.pop();
        }, error => { });
    } else {
      let objAlert = { title: "Validação", message: retorno };
      this.alertService.showAlert(objAlert);
    }    
  }

  checkFormData(categoria) {
    let retorno = "";
    if (!categoria.name) {
      retorno = "Nome obrigatório";
    } else {
      retorno = "";
    }
    return retorno;
  }

}
