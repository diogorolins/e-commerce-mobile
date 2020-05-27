import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewAddressPage } from './new-address';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';

@NgModule({
  declarations: [
    NewAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(NewAddressPage),
  ],
  providers: [
    CidadeService,
    EstadoService
  ]
})
export class NewAddressPageModule {}
