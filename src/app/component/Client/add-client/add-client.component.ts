import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [RouterModule,ButtonsModule],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss'
})
export class AddClientComponent {
  title = 'ASAPKendo UI';
  constructor(public router: Router){
    
  }
  public onButtonClick(): void {
    
    this.router.navigate(['/Detail'])
  }
  
}
