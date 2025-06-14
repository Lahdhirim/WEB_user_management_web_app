import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  user = {
    first_name: '',
    last_name: '',
    company_id: '',
    position: '',
    join_date: new Date().toISOString().slice(0, 10),
    read_permission: false,
    edit_permission: false,
    deploy_permission: false
  };
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  addUser() {
    this.errorMessage = '';

    if (!this.user.first_name.trim()) {
      this.errorMessage = 'First Name is required.';
      return;
    }
    if (!this.user.last_name.trim()) {
      this.errorMessage = 'Last Name is required.';
      return;
    }
    const companyId = Number(this.user.company_id);
    if (!companyId || companyId < 100000 || companyId > 999999) {
      this.errorMessage = 'Company ID must be a 6-digit number.';
      return;
    }
    if (!this.user.position) {
      this.errorMessage = 'Company Position is required.';
      return;
    }
    if (!this.user.join_date) {
      this.errorMessage = 'Join Date is required.';
      return;
    }

    this.userService.createUser(this.user).subscribe({
      next: () => {
        console.log('User added successfully');
        window.alert('✅ User added successfully!');
        window.location.reload();
      },
      error: (err) => {
        console.error('Error adding user:', err);
        this.errorMessage = 'An error occurred while adding the user. Please try again.';
      }
    });
  }
}

