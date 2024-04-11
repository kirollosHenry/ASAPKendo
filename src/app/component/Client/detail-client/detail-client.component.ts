import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '../../../Model';
import { GetALLClientService } from '../../../Services/Pageing/get-allclient.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { AddClientComponent } from '../add-client/add-client.component';
import { LabelModule } from '@progress/kendo-angular-label';


@Component({
  selector: 'app-detail-client',
  standalone: true,
  imports: [RouterOutlet, DateInputsModule, 
    AddClientComponent, DetailClientComponent, ButtonsModule,
     RouterModule, InputsModule, FormsModule, ReactiveFormsModule,LabelModule],
  templateUrl: './detail-client.component.html',
  styleUrl: './detail-client.component.scss'
})
export class DetailClientComponent {
  clientId: number = 0; // Default value for client ID
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  email: string = '';
  userInputSummary: string = '';
  clientForm!: FormGroup;
constructor(private  clientService:GetALLClientService,private fb: FormBuilder,private router: Router){

}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required ,Validators.pattern(/^\d+$/)]],
      email: [' ', [Validators.required, Validators.email]]
    });
  }


  onSubmit(): void {

       if(this.clientForm.valid) {
      const formData = this.clientForm.value;
      const newClient: Client = {
        clientId: 1, // Assuming it's a new client
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email
      };
      
      this.clientService.AddClient(newClient).subscribe({
        next: (response) => {
          // Handle success
          if(response.status){
            this.userInputSummary= response.message 
            this.clientForm.reset();
            console.log('Client added successfully:', response.message);
          }else{
            this.userInputSummary= 'Client can not add  :'+response.message;
            console.log( response.message);
          }
         
        },
        error: (error) => {
          this.userInputSummary+=error.message;
          console.error('Failed to add client:', error.message);
        }
      });
        } 
      }



      
}
