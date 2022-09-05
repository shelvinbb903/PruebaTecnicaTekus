import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName = "";
  password = "";
  hidePassword = true;
  errors = "";
  showProgress = false;
  
  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Conectar al servicio de login para obtener los datos del usuario y 
   * el token generado para la sesion
   * 
   */
  async loginUser(){
    this.showProgress = true;
    const response:any = await this.usersService.loginUsers(this.userName, this.password);
    if(!response.error) {
      await this.usersService.saveDataSession(response.data);      
      this.errors = "";
      this.router.navigate(['listSubscribers']);
    } else {
      this.errors = response.data;
    }
    this.showProgress = false;
  }
  

}
