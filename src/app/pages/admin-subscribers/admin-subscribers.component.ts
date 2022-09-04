import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscribersService } from '../../services/subscribers.service';

@Component({
  selector: 'app-admin-subscribers',
  templateUrl: './admin-subscribers.component.html',
  styleUrls: ['./admin-subscribers.component.scss']
})
export class AdminSubscribersComponent implements OnInit {
  showProgress = false;
  countries: any = []
  
  constructor(private router: Router, private subscribersService: SubscribersService) { }

  async ngOnInit() {
    this.showProgress = true;
    await this.listCountries();
    this.showProgress = false;
  }

  /**
   * [goBack Regresar a la pagina de listado]
   * 
   */
  goBack() {
    this.router.navigate(['listSubscribers']);
  }

  /**
   * [goBack Generar listado de todos los paises al cargar la pagina]
   * 
   */
  async listCountries() {
    const response:any = await this.subscribersService.listCountries();
    if(!response.error) {
      this.countries = [...response.data.Data];
    }
  }

}
