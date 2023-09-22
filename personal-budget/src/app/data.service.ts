import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data = [];
  constructor(private http: HttpClient) {}

  getData() :void {
    if(this.data.length == 0){
      this.http.get('http://localhost:3000/budget')
      .subscribe((res: any) => {
        this.data = res.myBudget;
        console.log(this.data);
      });
    }
}
  getDataSync(): any {
    return this.data;
  }
}
