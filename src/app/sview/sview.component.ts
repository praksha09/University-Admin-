import { Component, OnInit,ViewChild } from '@angular/core';
import{Http,Headers,Response, URLSearchParams, RequestOptions} from '@angular/http';
import {FormControl,Validators,FormGroup} from '@angular/forms';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {state} from '../state';



@Component({
  selector: 'app-sview',
  templateUrl: './sview.component.html',
  styleUrls: ['./sview.component.css']
})

export class SviewComponent implements OnInit {
  stateForm: FormGroup;
  hasSubmitted:boolean;
  
  private index;
  private str;
  private dataSource;
  displayedColumns = [ 's_id', 's_name','options'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http:Http) { }

  ngOnInit() {
    
    this.getdata();
    
    this.stateForm=new FormGroup({
      s_id:new FormControl(''),
      s_name:new FormControl('',Validators.required)
    })
  }

  ngAfterViewInit() {
   
  }
  public onFormSubmit(){
    if(this.stateForm.invalid)
    {
      this.hasSubmitted=true;
      alert("Fill Properly");
    }
    else{
      this.hasSubmitted=false;
      
      let str=this.stateForm.value;
      console.log(str);
      var url = "http://localhost:3000/stateapi/state";
        this.http.post(url,str).subscribe(( res:Response) => {
     
             console.log(res);
    })
    }
  }
    
  public getdata()
  {    
    var strurl="http://localhost:3000/stateapi/state"; 
   return this.http.get(strurl).subscribe(( res2:Response) =>{ this.str=res2.json();
      this.dataSource=new MatTableDataSource<state>(res2.json());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort=this.sort;   
      console.log(this.dataSource.sort);
    })
  }
    public removeItem(index)
  {
    var con=confirm("Want to delete record?"+index.s_id);
    if(con)
    {
    var strurl="http://localhost:3000/stateapi/state/"+index.s_id;
    this.http.delete(strurl).subscribe((res:Response)=> alert("Deleted Successfully"));
    }
  }

  public editItem(s)
  {
    
    this.stateForm.controls.s_id.setValue(s.s_id);
    this.stateForm.controls.s_name.setValue(s.s_name);

  }
  public update(){
    if(this.stateForm.invalid)
    {
      this.hasSubmitted=true;
      alert("Fill Properly");
    }
    else{
      this.hasSubmitted=false;
      
      let str=this.stateForm.value;
      console.log(str);
    var url = "http://localhost:3000/stateapi/state";
         this.http.put(url,str).subscribe(( res:Response) => {
     
              console.log(res);
        
              
     })
    }
  }
  public cancel(){
    this.stateForm.controls.s_id.setValue('');
    this.stateForm.controls.s_name.setValue('');
  }
}


