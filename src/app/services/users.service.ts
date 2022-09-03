import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  dataUserLogin: any = {};

  constructor(private restService: RestService) { }

  /**
   * [loginUsers description]
   *
   * @param   {string}  user      [user description]
   * @param   {string}  password  [password description]
   *
   * @return  {[type]}            [return description]
   */
  loginUsers(user:string, password:string){
    return new Promise(async (resolve) => {
      const data = {
        "UserName": user,
        "Password": password
      }
      const response = await this.restService.connectionPOST(`${environment.URL_SERVICES}account/login`, data, "", false);
      resolve(response)
    })
  }
}
