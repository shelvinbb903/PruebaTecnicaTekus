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
   * [listSubscribers description]
   *
   * @param   {string}  id  [id description]
   *
   * @return  {[type]}      [return description]
   */
  listSubscribers(id: string = "") {
    return new Promise(async (resolve) => {
      const response = await this.restService.connectionGET(`${environment.URL_SERVICES}subscribers${id!=""?"/"+id:""}`, {}, this.usersService.dataUserLogin.Token);
      resolve(response)
    })
  }
}
