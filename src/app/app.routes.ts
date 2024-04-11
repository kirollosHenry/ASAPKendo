import { Routes } from '@angular/router';
import { AddClientComponent } from './component/Client/add-client/add-client.component';
import { DetailClientComponent } from './component/Client/detail-client/detail-client.component';
import { AppComponent } from './app.component';
import { ListClientComponent } from './component/Client/List-client/list-client.component';

export const routes: Routes = [
    {path:'', redirectTo:'AddClientComponent', pathMatch:'full'},
    {path:'app', component:AppComponent, title:'app'},
    {path:'AddClient', component:AddClientComponent, title:'Add'},
    {path:'List', component:ListClientComponent, title:'List'},
    {path:'Detail', component:DetailClientComponent, title:'Detail'}
];
