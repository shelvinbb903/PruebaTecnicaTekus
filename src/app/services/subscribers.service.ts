import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { RestService } from './rest.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {
  optionAdmin = "CREATE";
  idUpdate = "CREATE";

  constructor(private restService: RestService, private usersService: UsersService) { }
  
  /**
   * Generar listado de suscriptores y/o consultar uno por id
   *
   * @param   {string}  id  Id del suscriptor a consultar
   *
   * @return  {Promise<object>} Retorna el listado en una promesa
   */
  listSubscribers(data:any, id: string = "") {
    return new Promise(async (resolve) => {
      const response = await this.restService.connectionGET(`${environment.URL_SERVICES}subscribers${id!=""?"/"+id:""}`, data, this.usersService.dataUserLogin.Token);
      resolve(response)
    })
  }

  /**
   * Crear suscriptores
   *
   * @param   {any}  data  Datos del suscriptor a crear en un objeto
   *
   * @return  {[type]}     Retorna la respuesta del servicio en una promesa
   */
  createSubscriber(data: any){
    return new Promise(async (resolve) => {
      const request = {
        "Subscribers": [data]
      }
      const response = await this.restService.connectionPOST(`${environment.URL_SERVICES}subscribers/`, request, this.usersService.dataUserLogin.Token);
      resolve(response)
    })
  }

  /**
   * Editar suscriptores
   *
   * @param   {any}  data  Datos del suscriptor a crear en un objeto
   *
   * @return  {[type]}     Retorna la respuesta del servicio en una promesa
   */
  updateSubscriber(data: any, id:string){
    return new Promise(async (resolve) => {
      data = {...data, Id: id}
      const response = await this.restService.connectionPUT(`${environment.URL_SERVICES}subscribers/${id}`, data, this.usersService.dataUserLogin.Token);
      resolve(response)
    })
  }

  /**
   * Crear suscriptores
   *
   * @param   {any}  data  Datos del suscriptor a crear en un objeto
   *
   * @return  {[type]}     Retorna la respuesta del servicio en una promesa
   */
  deleteSubscriber(id: any){
    return new Promise(async (resolve) => {
      const response = await this.restService.connectionDELETE(`${environment.URL_SERVICES}subscribers/${id}`, {}, this.usersService.dataUserLogin.Token);
      resolve(response)
    })
  }

  /**
   *  Generar la lista de paises
   *
   * @return  {Promise<object>} Retorna el listado en una promesa
   */
  listCountries() {
    return new Promise(async (resolve) => {
      const data = {
        "count": -1,
        "sortType": 0
      }
      const response = await this.restService.connectionGET(`${environment.URL_SERVICES}countries`, data, this.usersService.dataUserLogin.Token);
      resolve(response)
    })
  }
}
