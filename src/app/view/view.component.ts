import { Component, OnInit } from '@angular/core';
import {Http,Headers, Response, URLSearchParams, RequestOptions} from '@angular/http';
import { FilterPipe,OrderPipe} from '../filter.pipe';



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  statearr: any;
  private data;
  private str:any;
  private reverse:boolean=false;
  sorting:string='duration';  
  
  constructor(private orderPipe: OrderPipe,private http:Http) {
    console.log(this.orderPipe.transform(this.data, this.sorting));
  }

  ngOnInit() {
    this.getdata();
   
    
  }

  public getdata()
  {
    
    var uniurl = "http://localhost:3000/uniapi/unidetails";
    this.http.get(uniurl).subscribe(( res:Response) => this.data=res.json());  

  }
  public setOrder(str){
    if(this.sorting===this.str){
    this.reverse=!this.reverse;
    }
    this.sorting=this.str;
   
}


}
