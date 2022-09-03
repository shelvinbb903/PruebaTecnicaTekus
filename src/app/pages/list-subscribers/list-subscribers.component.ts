import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { SubscribersService } from '../../services/subscribers.service';

@Component({
  selector: 'app-list-subscribers',
  templateUrl: './list-subscribers.component.html',
  styleUrls: ['./list-subscribers.component.scss']
})
export class ListSubscribersComponent implements OnInit {
  listSubscribers: any = [];

  constructor(private usersService: UsersService, private subscribersService: SubscribersService) { }

  async ngOnInit() {
    const response:any = await this.subscribersService.listSubscribers();
    if(!response.error) {
      this.listSubscribers = response.data.Data;
    }
    console.log("LISTADO", response);    
  }

}
