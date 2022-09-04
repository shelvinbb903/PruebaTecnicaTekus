import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { RestService } from './rest.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private restService: RestService, private usersService: UsersService) { }
  
  /**
   * [listSubscribers Generar la lista de subscriptores y/o consultar uno por id]
   *
   * @param   {string}  id  [id description]
   *
   * @return  {Promise<object>} [return Retorna el listado en una promesa]
   */
  listSubscribers(id: string = "") {
    return new Promise(async (resolve) => {
      const response = await this.restService.connectionGET(`${environment.URL_SERVICES}subscribers${id!=""?"/"+id:""}`, {}, this.usersService.dataUserLogin.Token);
      resolve(response)
    })
  }

  /**
   * [listSubscribers Generar la lista de paises]
   *
   * @return  {Promise<object>} [return Retorna el listado en una promesa]
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
