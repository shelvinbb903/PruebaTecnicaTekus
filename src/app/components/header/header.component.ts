import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() eventBtn = () => {}
  @Input() iconBtn = ""
  @Input() title = ""

  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
  }

}
