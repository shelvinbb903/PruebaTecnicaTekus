import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { SubscribersService } from '../../services/subscribers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-subscribers',
  templateUrl: './list-subscribers.component.html',
  styleUrls: ['./list-subscribers.component.scss']
})
export class ListSubscribersComponent implements OnInit {
  listSubscribers: any = [];

  constructor(
    private usersService: UsersService, 
    private subscribersService: SubscribersService, 
    private router: Router
  ) { }

  showProgress = false;

  async ngOnInit() {
    this.showProgress = true;
    const response:any = await this.subscribersService.listSubscribers();
    if(!response.error) {
      this.listSubscribers = response.data.Data;
    } else {
      this.logout();
    }
    this.showProgress = false;  
  }

  /**
   * [logout Cerrar sesion]
   *
   */
  async logout() {
    this.usersService.clearSession();
    this.router.navigate(["/login"])
  }

  /**
   * [openAdminSubscriber Abrir pagina de editar/crear subscriptor]
   *
   */
  openAdminSubscriber() {
    this.router.navigate(["/adminSubscribers"])
  }

  /**
   * [deleteSubscriber Eliminar un subscriptor]
   * 
   */
  deleteSubscriber() {
    
  }

}

export class DialogContentExampleDialog {}
