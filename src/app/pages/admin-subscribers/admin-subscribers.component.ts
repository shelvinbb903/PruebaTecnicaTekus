import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscribersService } from '../../services/subscribers.service';

@Component({
  selector: 'app-admin-subscribers',
  templateUrl: './admin-subscribers.component.html',
  styleUrls: ['./admin-subscribers.component.scss']
})
export class AdminSubscribersComponent implements OnInit {
  showProgress = false;
  countries: any = []
  message = "";
  messageType = ""
  subscriber: any = { 
    Name: "", 
    Email: "", 
    CountryCode: "", 
    CountryName: "", 
    PhoneCode: "", 
    PhoneNumber: "", 
    JobTitle: "", 
    Area: "", 
    Topics: [] 
  }
  
  constructor(private router: Router, private subscribersService: SubscribersService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.showProgress = true;
    await this.listCountries();

    if(this.subscribersService.optionAdmin == "UPDATE") {
      await this.getDataSubscriber(this.subscribersService.idUpdate)
    }
    this.showProgress = false;
  }

  /**
   * Regresar a la pagina de listado
   * 
   */
  goBack() {
    this.router.navigate(['listSubscribers']);
  }

  /**
   * Generar listado de todos los paises al cargar la pagina
   * 
   */
  async listCountries() {
    const response:any = await this.subscribersService.listCountries();
    if(!response.error) {
      this.countries = [...response.data.Data];
    }
  }

  /**
   * Obtener los datos de un suscriptor
   *
   * @param   {string}  id  Id del suscriptor a buscar
   */
  async getDataSubscriber(id:string) {
    const response:any = await this.subscribersService.listSubscribers({},id);
    if(!response.error) {
      this.subscriber = response.data
    }
  }

  /**
   * Guardar cambios en un suscriptor.
   *
   * @return  {[type]}  [return description]
   */
  async saveSubscriber() {
    this.showProgress = true;
    let dataErrors = [];
    this.message = "";
    this.messageType = "";

    if(this.subscriber.Name.trim() == "") {
      dataErrors.push("Nombre")
    }
    if(this.subscriber.CountryCode.trim() == "") {
      dataErrors.push("País")
    }
    if(this.subscriber.Email.trim() == "") {
      dataErrors.push("Correo Electrónico")
    }
    if(this.subscriber.PhoneNumber == "") {
      dataErrors.push("Número Teléfono")      
    }
    if(dataErrors.length > 0) {
      this.messageType = "warning";
      this.message = "Los siguientes campos son obligatorios y deben llenarse: " + dataErrors.join(", ")
      this.showProgress = false;
      return;
    }
    const dataCountry:any = this.countries.find((item: any) => item.Code == this.subscriber.CountryCode)
    if(dataCountry) {
      this.subscriber.PhoneCode = dataCountry.PhoneCode ? `+${dataCountry.PhoneCode}` : ""
    }
    let response:any = {}
    let typeService = "";
    if(this.subscribersService.optionAdmin == "CREATE") {
      typeService = "creado";
      response = await this.subscribersService.createSubscriber(this.subscriber);
    }else{
      typeService = "actualizado";
      response = await this.subscribersService.updateSubscriber(this.subscriber, this.subscribersService.idUpdate);
    }
    if(!response.error) {
      this.messageType = "success";
      this.message = `Suscriptor ${typeService} correctamente`;

      this.subscriber = { 
        Name: "", 
        Email: "", 
        CountryCode: "", 
        CountryName: "", 
        PhoneCode: "", 
        PhoneNumber: "", 
        JobTitle: "", 
        Area: "", 
        Topics: [] 
      }

      setTimeout(() => {
        this.router.navigate(['listSubscribers']);
      }, 1000)
    } else {
      this.messageType = "warning";
      this.message = response.data;
    }
    this.showProgress = false;
  }

}
