import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client, GridDataResult, ResultDto } from '../../Model';
import { Observable } from 'rxjs';
import { State } from '@progress/kendo-data-query';
import { environment } from '../../Environment/environment';


@Injectable({
  providedIn: 'root'
})
export class GetALLClientService {
  private apiOrderURL = environment.GetAll;
 
  constructor(private http: HttpClient) { }

  getClients(state:State): Observable<GridDataResult> {
    
    return this.http.get<GridDataResult>(`${this.apiOrderURL}/${state.skip},${state.take}`);
  }



 
  DeleteCleint(clientId: number):Observable<ResultDto>{
    const url = `${this.apiOrderURL}/${clientId}`;
    return this.http.delete<ResultDto>(url);
  }




  AddClient(client: Client): Observable<ResultDto>{
     const url = `${this.apiOrderURL}/create`;
    return this.http.post<ResultDto>(url, client);
  }
  

  EditClient(client: Client): Observable<ResultDto>{
    const url = `${this.apiOrderURL}/update`;
    return this.http.post<ResultDto>(this.apiOrderURL, client);
  }
}
