import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  /**
   * Generar una conexion a un servicio rest de tipo post
   *
   * @param   {string}  url   URL del servicio rest a ejecutar
   * @param   {any}     data  Parametros a enviar en el servicio rest
   * @param   {string}  token Token de la sesion del usuario
   * @param   {boolean}  sendToken Validar si el servicio rest envia el token de la sesion o no
   *
   * @return  {Promise<object>}   Se genera una promesa con el resultado del servicio rest, ya sea correcto o con error
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
   * Generar una conexion a un servicio rest de tipo delete
   *
   * @param   {string}  url   URL del servicio rest a ejecutar
   * @param   {any}     data  Parametros a enviar en el servicio rest
   * @param   {string}  token Token de la sesion del usuario
   *
   * @return  {Promise<object>}   Se genera una promesa con el resultado del servicio rest, ya sea correcto o con error
   */
  connectionDELETE(url: string, data: any, token: string = "") {
    return new Promise(resolve => {
      let headers = new HttpHeaders();
      headers = headers.append('Authorization', 'Bear ' + token);
      
      this.http.delete(url, {headers, body: data}).subscribe({
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
   * Generar una conexion a un servicio rest de tipo put
   *
   * @param   {string}  url   URL del servicio rest a ejecutar
   * @param   {any}     data  Parametros a enviar en el servicio rest
   * @param   {string}  token Token de la sesion del usuario
   *
   * @return  {Promise<object>}   Se genera una promesa con el resultado del servicio rest, ya sea correcto o con error
   */
  connectionPUT(url: string, data: any, token: string = "") {
    return new Promise(resolve => {
      let headers = new HttpHeaders();
      headers = headers.append('Authorization', 'Bear ' + token);
      
      this.http.put(url, data, {headers}).subscribe({
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
   * Generar una conexion a un servicio rest de tipo get
   *
   * @param   {string}  url   URL del servicio rest a ejecutar
   * @param   {any}     data  Parametros a enviar en el servicio rest
   * @param   {string}  token Token de la sesion del usuario
   *
   * @return  {Promise<object>}        Se genera una promesa con el resultado del servicio rest, ya sea correcto o con error
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
