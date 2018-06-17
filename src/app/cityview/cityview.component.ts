import { Component, OnInit, ViewChild } from '@angular/core';
import{Http,Headers,Response, URLSearchParams, RequestOptions} from '@angular/http';
import{FormGroup,Validators,FormControl} from '@angular/forms';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { city } from '../city';

@Component({
  selector: 'app-cityview',
  templateUrl: './cityview.component.html',
  styleUrls: ['./cityview.component.css']
})
export class CityviewComponent implements OnInit {
  
  cityForm:FormGroup;
  hasSubmitted:boolean;
  private city;

  private dataSource;
  displayedColumns = [ 'id', 's_id','city','options'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private http:Http) { }

  ngOnInit() {
    this.getdata();
    this.cityForm=new FormGroup({
      id:new FormControl(''),
      s_id:new FormControl('',Validators.required),
      city:new FormControl('',Validators.required)
    });
  }
  public onFormSubmit(){
    if(this.cityForm.invalid)
    {
      this.hasSubmitted=true;
      alert("Fill properly");
    }
    else{
      this.hasSubmitted=false;
      let str=this.cityForm.value;
      console.log(str);
      var url = "http://localhost:3000/cityapi/city";
        this.http.post(url,str).subscribe(( res:Response) => {
     
             console.log(res);
    }) 
    }
  }
  public getdata()
  {    
    var strurl="http://localhost:3000/cityapi/city"; 
    this.http.get(strurl).subscribe(( res2:Response) => {this.city=res2.json();
    this.dataSource=new MatTableDataSource<city>(res2.json());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
    })
}

public removeItem(index)
  {
    var con=confirm("Want to delete record?"+index);
    if(con)
    {
    var strurl="http://localhost:3000/cityapi/city/"+index;
    this.http.delete(strurl).subscribe((res:Response)=> alert("Deleted Successfully"));
    }

  }

  public editItem(c)
  {
    this.cityForm.controls.s_id.setValue(c.s_id);
    this.cityForm.controls.city.setValue(c.city);
    this.cityForm.controls.id.setValue(c.id);

  }

  public update(){
    if(this.cityForm.invalid)
    {
      this.hasSubmitted=true;
      alert("Fill Properly");
    }
    else{
      this.hasSubmitted=false;
      
      let str=this.cityForm.value;
      console.log(str);
    var url = "http://localhost:3000/cityapi/city";
         this.http.put(url,str).subscribe(( res:Response) => {
     
              console.log(res);
        
              
     })
    }

  }

  public cancel(){
    this.cityForm.controls.s_id.setValue('');
    this.cityForm.controls.city.setValue('');
    this.cityForm.controls.id.setValue('');
  }

}
