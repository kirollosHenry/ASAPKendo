
export interface Client {
    clientId:number,
    firstName  :string,
    lastName:string,
    phoneNumber :string,
    email :string
 }
 export interface ResultDto {
   message:string;   
   entityDto: Client[]; 
   status: boolean;
  
 }
 
 export interface GridDataResult {
    data: Client[]; 
    total: number;
   
  }
