import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { UniversityService } from '../university.service';
import {Http, Headers, Response, URLSearchParams, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import { University } from '../University';
import {state, states} from '../state';
import{city} from '../city';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { from } from 'rxjs/observable/from';
import { category } from '../category';
import { FilterPipe,OrderPipe} from '../filter.pipe';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {
  universityService: any;
  
  universityForm:FormGroup;
  catarr:category[];
  statearr:state[];
  cityarr:city[];
  

  hasSubmitted: boolean; 
  nameId:Number;
  
  private data:any;
  private str:any;
  private reverse:boolean=false;
  sorting:string='duration';  
  private dataSource;
  displayedColumns = ['u_name','s_id', 'city','cat_id','location','email','rating','options'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  default: string=null;
  
  constructor(private orderPipe: OrderPipe,private http:Http,private fb:FormBuilder) {
   
  }

   

  ngOnInit() {
    this.getdata();
    this.getcat();
    this.getstate();

    this.universityForm=this.fb.group({
      u_id:[''],
      u_name:['',Validators.required],
      s_id:['',Validators.required],
      city:['null',Validators.required],
      cat_id:['null',Validators.required],
      rating:['',Validators.required],
      location:['',Validators.required],
      email:['',Validators.required,Validators.pattern["^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"]]
    })


  }
  public getcat()
  {
    var url="http://localhost:3000/catapi/cat";
    this.http.get(url).subscribe((res:Response)=>{
      let cat=res.json();
      this.catarr=cat;

    })

  }

  public getstate()
  {

    var strurl = "http://localhost:3000/stateapi/state";
    
    this.http.get(strurl).subscribe(( res:Response) => {

        let str =  res.json();     
         this.statearr = str;
   })
   var cityurl = "http://localhost:3000/cityapi/city";
    this.http.get(strurl).subscribe(( res:Response) => {
 
        let c =  res.json()
      });

  }
  selectName()
  {

    this.cityarr=[];
    var strurl = "http://localhost:3000/cityapi/city/"+this.nameId;
    this.http.get(strurl).subscribe(( res:Response) => {
 
        let str =  res.json();
   
         console.log(str);
         this.cityarr = str;
         console.log('state'+this.cityarr[0].city);
   })
  }
  
  public onFormSubmit(){
    if(this.universityForm.invalid)
    {
      this.hasSubmitted=true;
      alert("Fill All Details Properly");
       return;
    }
    else{
      this.hasSubmitted=false;

      alert("hi");
      let uni=this.universityForm.value;
      console.log(uni);
      
        var strurl = "http://localhost:3000/uniapi/uni";
        this.http.post(strurl,uni).subscribe(( res:Response) => {
     
             console.log(res);
       })           
    }
  }
  public getdata()
  {
    
    var uniurl = "http://localhost:3000/uniapi/unidetails";
    this.http.get(uniurl).subscribe(( res:Response) =>{ this.data=res.json(); 
    this.dataSource=new MatTableDataSource<University>(res.json());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;  
    })
  }
  public setOrder(str){
    if(this.sorting===this.str){
    this.reverse=!this.reverse;
    }
    this.sorting=this.str;
   
}
public removeItem(index)
{
  var con=confirm("Want to delete record?"+index.u_id);
  if(con)
  {
  var strurl="http://localhost:3000/uniapi/uni/"+index.u_id;
  this.http.delete(strurl).subscribe((res:Response)=> alert("Deleted Successfully"));
  }
}
public editItem(s)
  {
    this.default=s.city;
    console.log(this.default);
    this.universityForm.controls.u_id.setValue(s.u_id);
    this.universityForm.controls.u_name.setValue(s.u_name);
    this.universityForm.controls.s_id.setValue(s.s_id);
    this.universityForm.controls.cat_id.setValue(s.cat_id);
    this.universityForm.controls.city.setValue(s.city);
    this.universityForm.controls.rating.setValue(s.rating);
    this.universityForm.controls.location.setValue(s.location);
    this.universityForm.controls.email.setValue(s.email);

  }
  public update(){
    if(this.universityForm.invalid)
    {
      this.hasSubmitted=true;
      alert("Fill Properly");
    }
    else{
      this.hasSubmitted=false;
      
      let str=this.universityForm.value;
      console.log(str);
    var url = "http://localhost:3000/uniapi/uni";
         this.http.put(url,str).subscribe(( res:Response) => {
     
              console.log(res);
        
              
     })
    }
  }
  public cancel(){
    this.universityForm.controls.u_id.setValue('');
    this.universityForm.controls.u_name.setValue('');
    this.universityForm.controls.s_id.setValue('');
    this.universityForm.controls.cat_id.setValue('');
    this.universityForm.controls.city.setValue('');
    this.universityForm.controls.rating.setValue('');
    this.universityForm.controls.location.setValue('');
    this.universityForm.controls.email.setValue('');
  }

}
