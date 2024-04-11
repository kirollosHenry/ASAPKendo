import { Component,OnInit  } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DataStateChangeEvent, GridDataResult, GridModule } from '@progress/kendo-angular-grid';
import { GetALLClientService } from './Services/Pageing/get-allclient.service';
import {  Subscription } from 'rxjs';
import { State } from '@progress/kendo-data-query';
import { AddClientComponent } from './component/Client/add-client/add-client.component';
import { DetailClientComponent } from './component/Client/detail-client/detail-client.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule  } from '@angular/forms';
import { Client } from './Model';
import { HeaderComponent } from "./header/header.component";




@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, DateInputsModule, GridModule,
       AddClientComponent, DetailClientComponent, ButtonsModule,
        RouterModule, InputsModule, FormsModule, ReactiveFormsModule,
         HeaderComponent]
})
export class AppComponent implements OnInit {
  
  sub!: Subscription;
  public loading = false;
  clientForm!: FormGroup;
  public state: State = {
    skip: 1,
    take: 4,
    group: [],
    filter: { filters: [], logic: "and" },
    sort: [],
  };
  public data: GridDataResult = { data: [], total: 0 };
  constructor(private clientService: GetALLClientService,private router: Router ,private fb: FormBuilder) { 
    this.sendRequest(this.state);
  
  }
  ngOnInit(): void {
    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.sendRequest(this.state);
  }

  public sendRequest(state: State): void {
    this.loading = true;
    // Call your custom service to fetch data
    this.clientService.getClients(state).subscribe((response: GridDataResult) => {
      this.data = response;
      console.log(response)
      this.loading = false;
    });
  }
 
  // public add(): void {
  //   this.clientService.AddClient(client).subscribe({
  //     next: (response: ResultDto) => {
  //       if (response.status) {
  //         console.log('Client added successfully:', response.message);
  //         // Handle success, e.g., show a success message or navigate to another page
  //       } else {
  //         console.error('Failed to add client:', response.message);
  //         // Handle error, e.g., show an error message
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Failed to add client:', error);
  //       // Handle error, e.g., show an error message
  //     }
  //   });
  // }

  public onEdit(dataItem: any): void {
    // Add logic to edit a record
  }

  public remove(dataItem: number): void {
    this.clientService.DeleteCleint(dataItem).subscribe({ 
      next: (response) => {
          if (response.status) {
              console.log('Client deleted successfully:', response.message);
              this.sendRequest(this.state)
          } else {
              console.error('Failed to delete client:', response.message);
          }
      },
      error: (error) => {
          console.error('Failed to delete client:', error);
      }
  });
  }


  clientId: number = 0; // Default value for client ID
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  email: string = '';
  onSubmit(): void {
       
      const formData = this.clientForm.value;
      const newClient: Client = {
        clientId: 1, // Assuming it's a new client
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email
      };
        newClient.firstName = "John";
        newClient.lastName = "amir";
        newClient.phoneNumber = "012554111";
        newClient.email="amir255@example.com";
        newClient.clientId = 5;
      this.clientService.AddClient(newClient).subscribe({
        next: (response) => {
          // Handle success
          if(response.status){
            console.log('Client added successfully:', response.message);
          }else{
            console.log('Client can not add  :', response.message);
          }
         
        },
        error: (error) => {
          // Handle error
          console.error('Failed to add client:', error);
        }
      });
    }
  
}
