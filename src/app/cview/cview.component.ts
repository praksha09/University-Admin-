import { Component, OnInit, ViewChild } from '@angular/core';
import {Http,Headers,Response, URLSearchParams, RequestOptions} from '@angular/http';
import { FormGroup } from '@angular/forms/src/model';
import { Validators, FormBuilder } from '@angular/forms';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { course } from '../course';

@Component({
  selector: 'app-cview',
  templateUrl: './cview.component.html',
  styleUrls: ['./cview.component.css']
})
export class CviewComponent implements OnInit {
  hasSubmitted: boolean;
  
  courseForm: FormGroup;
  private dataSource;
  displayedColumns = [ 'c_id', 'c_name','duration','details','options'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http:Http,private fb:FormBuilder) { }
  private course;
  
  ngOnInit() {
    this.getdata();
    this.courseForm=this.fb.group({
      c_id:[''],
      c_name:['',Validators.required],
      duration:['',Validators.required],
      details:['',Validators.required]
    })
  }
  public onFormSubmit(){
    if(this.courseForm.invalid)
    {
      this.hasSubmitted=true;
     alert("Fill details properly"); 
    }
    else{
      this.hasSubmitted=false;
      let course=this.courseForm.value;
      console.log(course);
      
        var url = "http://localhost:3000/courseapi/course";
        this.http.post(url,course).subscribe(( res:Response) => {
     
             console.log(res);
  })
}
  }

  public getdata()
  {
    
    var courseurl="http://localhost:3000/courseapi/course"; 
    this.http.get(courseurl).subscribe(( res2:Response) => {this.course=res2.json();
    this.dataSource=new MatTableDataSource<course>(res2.json());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort=this.sort;   
      console.log(this.dataSource.sort);
    })
}
public removeItem(index)
  {
    var con=confirm("Want to delete record?"+index);
    if(con)
    {
    var strurl="http://localhost:3000/courseapi/course/"+index;
    this.http.delete(strurl).subscribe((res:Response)=> alert("Deleted Successfully"));
    }
  }

  public editItem(c)
  { 
  this.courseForm.controls.c_id.setValue(c.c_id);
  this.courseForm.controls.c_name.setValue(c.c_name);
  this.courseForm.controls.duration.setValue(c.duration);
  this.courseForm.controls.details.setValue(c.details);

  }
  public update(){
    if(this.courseForm.invalid)
    {
      this.hasSubmitted=true;
      alert("Fill Properly");
    }
    else{
      this.hasSubmitted=false;
      
      let str=this.courseForm.value;
      console.log(str);
    var url = "http://localhost:3000/courseapi/course";
         this.http.put(url,str).subscribe(( res:Response) => {
     
              console.log(res);
        
              
     })
    }
  }
  public cancel(){
    this.courseForm.controls.c_name.setValue('');
    this.courseForm.controls.c_id.setValue('');
    this.courseForm.controls.duration.setValue('');
    this.courseForm.controls.details.setValue('');
  }
}
