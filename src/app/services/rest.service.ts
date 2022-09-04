import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  /**
   * [connectionPOST Generar una conexion post]
   *
   * @param   {string}  url   [url URL del servicio rest a ejecutar]
   * @param   {any}     data  [data Parametros a enviar en el servicio rest]
   * @param   {string}  token [token Token de la sesion del usuario]
   * @param   {boolean}  sendToken [sendToken Validar si el servicio rest envia el token de la sesion o no]
   *
   * @return  {Promise<object>}   [Se genera una promesa con el resultado del servicio rest, ya sea correcto o con error]
   */
  connectionPOST(url: string, data: any, token: string = "", sendToken: boolean = true) {
    return new Promise(resolve => {
      let headers = new HttpHeaders();
      if(sendToken) { 
        headers = headers.append('Authorization', 'Bear ' + token);
      }
      
      this.http.post(url, data, {headers}).subscribe({
        next: response => {
          resolve({
            error: false,
            data: response
          })
        },
        error: dataError => {
          resolve({
            error: true,
            data: dataError.error.error || dataError.error.Message
          })
        }
      })
    })
  }

  /**
   * [connectionGET Generar una conexion get]
   *
   * @param   {string}  url   [url URL del servicio rest a ejecutar]
   * @param   {any}     data  [data Parametros a enviar en el servicio rest]
   * @param   {string}  token [token Token de la sesion del usuario]
   *
   * @return  {Promise<object>}        [Se genera una promesa con el resultado del servicio rest, ya sea correcto o con error]
   */
  connectionGET(url: string, data: any, token: string) {
    return new Promise(resolve => {
      let headers = new HttpHeaders();
      headers = headers.append('Authorization', 'Bear ' + token);

      this.http.get(url, {headers, params: data}).subscribe({
        next: response => {
          resolve({
            error: false,
            data: response
          })
        },
        error: dataError => {
          resolve({
            error: true,
            data: dataError.error.error || dataError.error.Message
          })
        }
      })
    })
  }
}
