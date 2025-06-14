import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
  providers: [DatePipe]
})
export class UserTableComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  uniquePositions: string[] = [];
  p: number = 1;
  selectedCompanyPosition: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = data;
      this.uniquePositions = [...new Set(this.users.map(user => user.position))];
    });
  }

  filterUsers() {
    if (this.selectedCompanyPosition) {
      this.filteredUsers = this.users.filter(user => user.position === this.selectedCompanyPosition);
    } else {
      this.filteredUsers = this.users;
    }
  }

  deleteUser(userId: string) {
    console.log('Deleting user with ID:', userId);
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
      console.log("User deleted successfully");
    });
  }

  updateUser(user: any) {
    console.log('Updating user with ID:', user._id);
    this.userService.updateUser(user._id, user).subscribe(() => {
      this.loadUsers();
      console.log("User updated successfully");
    });
  }
}