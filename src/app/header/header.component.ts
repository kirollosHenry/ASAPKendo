import { Component } from '@angular/core';
import { LayoutModule } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LayoutModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
