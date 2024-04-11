import { Component,OnDestroy,OnInit  } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DateInputsModule, } from '@progress/kendo-angular-dateinputs';
import {  AddEvent, CreateFormGroupArgs, DataStateChangeEvent, EditEvent, GridDataResult, GridModule,  SaveEvent } from '@progress/kendo-angular-grid';
import {  Observable, Subscription } from 'rxjs';
import { State } from '@progress/kendo-data-query';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FormBuilder, FormGroup, FormsModule,ReactiveFormsModule, FormControl, Validators  } from '@angular/forms';
import { AddClientComponent } from '../add-client/add-client.component';
import { DetailClientComponent } from '../detail-client/detail-client.component';
import { GetALLClientService } from '../../../Services/Pageing/get-allclient.service';
import { Client } from '../../../Model';


@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [
    RouterOutlet, DateInputsModule, GridModule, 
    AddClientComponent, DetailClientComponent, ButtonsModule,
     RouterModule, InputsModule, FormsModule, ReactiveFormsModule],
  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.scss'
})


export class ListClientComponent implements OnInit {
  public client: Client[] = [];
  sub!: Subscription;
  public loading = false;

  public state: State = { 
    skip: 0,
                            take: 5,
                            group: [],
                            filter: { filters: [], logic: "and" },
                            sort: [],
};

  public data: GridDataResult = { data: [], total: 0 };

  constructor(private clientService: GetALLClientService,private router: Router ,private formBuilder: FormBuilder) { 
    this.sendRequest(this.state);
    this.createFormGroup = this.createFormGroup.bind(this);
  }
  public formGroup: FormGroup = this.formBuilder.group({
    clientId: null,
    firstName: "",
    lastName: null,
    phoneNumber: null,
    email: false,
  });
  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const item = args.isNew ? this.client : args.dataItem;
  
    return this.formBuilder.group({
      clientId: item ? 1 : item.clientId,
      firstName: [item.firstName, Validators.required],
      lastName: [item.lastName, Validators.required],
      phoneNumber: [item.phoneNumber, Validators.required ,Validators.pattern(/^\d+$/)],
      email: [item.email, Validators.email],
    });
  }

  public getErrorMessage(controlName: string): string {
    const control = this.formGroup.get(controlName);
  
    if (control?.errors) {
      if (control.errors['required']) {
        return 'This field is required.';
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address.';
      }
      if (control.errors['pattern']) {
        return 'Please enter a valid phone number.';
      }
    }
  
    return '';
  }
  
  ngOnInit(): void {
   
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.sendRequest(this.state);
  }

  public sendRequest(state: State): void {
    this.loading = true;

   this.sub= this.clientService.getClients(state).subscribe((response: GridDataResult) => {
      this.data = response;
      console.log(response)
      this.loading = false;
    });
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

  ngOnDestroy(): void {
if(this.sub)
  {
    this.sub.unsubscribe();
  }
  }
 
  public editingItem: Client | null = null;
  
  public edit(dataItem: Client): void {
   
    this.editingItem = dataItem;
  }

  public cancelEdit(): void {
    
    this.editingItem = null;
  }

  public saveEdit(dataItem:Client): void {
    this.clientService.EditClient(dataItem).subscribe({
      next:(respo)=>{
        if(respo.status){
          console.log('Saving changes for client:' +respo.message , this.editingItem);
          this.editingItem = null;
        }else{
          console.log(respo.message);
        }
      }
    })
    
   
  }




}
