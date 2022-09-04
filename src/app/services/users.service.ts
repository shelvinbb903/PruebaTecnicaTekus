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
   * @param   {string}  user      [user Usuario que va a hacer login]
   * @param   {string}  password  [password Contraseña del usuario]
   *
   * @return  {Promise<object>}   [return Retorna el valor en una promesa]
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

  /**
   * [saveDataSession Guardar los datos del login en la sesion]
   *
   * @param   {any}  data  [data Datos del login]
   * 
   */
  saveDataSession(data: any) {
    return new Promise(async (resolve) => {
      sessionStorage.setItem('login', JSON.stringify(data));
      resolve(true)
    })
    
  }

  /**
   * [loadDataSession Cargar los datos de la sesion]
   * 
   */
  async loadDataSession() {
    const data = await sessionStorage.getItem('login')
    if(data) {
      this.dataUserLogin = JSON.parse(data);
    } 
  }

  /**
   * [clearSession Borrar los datos de la sesion]
   *
   */
  clearSession() {
    sessionStorage.clear()
    sessionStorage.removeItem("login")
    this.dataUserLogin = {}
  }
}
