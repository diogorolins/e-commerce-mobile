import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { AlertService } from '../../services/alert.service';

@IonicPage()
@Component({
  selector: 'page-category-adm',
  templateUrl: 'category-adm.html',
})
export class CategoryAdmPage {

  categorias: CategoriaDTO[];
  alterOk: boolean = true;
  deleteOk: boolean = true; 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    public alertService: AlertService) {
  }

  ionViewDidLoad() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriaService.findAll()
      .subscribe(response => {
        this.categorias = response;
      },
        error => { })
  }

  goToNew() {
    this.navCtrl.push("CategoryAdmNewPage", { parentPage: this });
  }

  goToAlter() {
    let checkedCategorias = this.getSelected(this.categorias);    
    this.navCtrl.push("CategoryAdmNewPage", { categoria: checkedCategorias[0], parentPage: this })
  }

  enableAlter(id: string) {
    let checkedCategorias = this.getSelected(this.categorias);
    if (checkedCategorias.length == 1) {
      this.alterOk = false;
      this.deleteOk = false;
    } else if (checkedCategorias.length > 1) {
      this.alterOk = true;
      this.deleteOk = false;
    } else {
      this.deleteOk = true;
      this.alterOk = true;
    }
  }

  confirmDelete() {
    this.sendConfirmation();
  }

  sendConfirmation() {
    let objConfirm = {
      title: "Confirmação",
      message: "Tem certeza que deseja apagar as categorias selecionadas?",
      event: () => { this.deleteCategory() }
    }
    this.alertService.showConfirmation(objConfirm);
  }

  deleteCategory() {
    let checkedCategorias = this.getSelected(this.categorias);
    checkedCategorias.forEach(e => {
      this.categoriaService.remove(e.id)
        .subscribe(
          response => { this.loadCategories() },
          error => { }
        );
    });
  }

  getSelected(object) {
    return object.filter(e => e["selected"] == true);
  }

  back() {
    this.navCtrl.setRoot("AdminMenuPage");
  }

}
