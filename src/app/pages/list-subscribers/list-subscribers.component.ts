import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { SubscribersService } from '../../services/subscribers.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-subscribers',
  templateUrl: './list-subscribers.component.html',
  styleUrls: ['./list-subscribers.component.scss']
})
export class ListSubscribersComponent implements OnInit {
  listSubscribers: any = [];
  tableTools = {
    dataFilter: "",
    currentPage: 1,
    pageSize: 5,
    listSize: 0
  }

  showProgress = false;

  constructor(
    private usersService: UsersService, 
    private subscribersService: SubscribersService, 
    private router: Router,
    private modalService: NgbModal
  ) { }

  async ngOnInit() {
    this.showProgress = true;
    await this.getSubscribers(this.tableTools.currentPage, this.tableTools.pageSize)
    this.showProgress = false;  
  }

  /**
   * Cerrar sesion
   *
   */
  async logout() {
    this.usersService.clearSession();
    this.router.navigate(["/login"])
  }

  /**
   * Abrir pagina de editar/crear subscriptor
   *
   */
  openAdminSubscriber(action: string, id: string = "") {
    this.subscribersService.optionAdmin = action
    this.subscribersService.idUpdate = id
    this.router.navigate(["/adminSubscribers"])
  }

  /**
   * Eliminar un subscriptor
   * 
   */
  async deleteSubscriber(content:any, id:string) {    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(async (result) => {
      if(result == "Si"){
        this.showProgress = true;
        const response:any = await this.subscribersService.deleteSubscriber(id);
        if(!response.error) {
          await this.getSubscribers(this.tableTools.currentPage, this.tableTools.pageSize);
        }
        this.showProgress = false;
      }
    }, (reason) => {});
  }

  /**
   * Obtener el listado de los suscriptores enviando los parametros de busqueda
   *
   * @param   {number}  page      Pagina actual
   * @param   {number}  pageSize  Numero de filas por pagina
   *
   */
  async getSubscribers(page:number, pageSize:number) {
    const data = {
      page,
      count: pageSize,
      criteria: this.tableTools.dataFilter
    }
    const response:any = await this.subscribersService.listSubscribers(data);
    if(!response.error) {
      this.listSubscribers = response.data.Data;
      this.tableTools.listSize = response.data.Count
    } else {
      this.logout();
    }
  }

  /**
   * Metodo para filtrar los datos de la tabla con respecto al campo de busqueda
   * 
   */
  async filterTable() {
    this.showProgress = true;
    await this.getSubscribers(this.tableTools.currentPage, this.tableTools.pageSize);
    this.showProgress = false;
  }

  /**
   * Metodo que genera el listado de suscriptores en la paginación
   *
   * @param   {any}   event  Pagina actual
   *
   */
  async pageChanged(event: any) {
    this.showProgress = true;
    this.tableTools.currentPage = event;
    await this.getSubscribers(this.tableTools.currentPage, this.tableTools.pageSize);
    this.showProgress = false;
  };

}
