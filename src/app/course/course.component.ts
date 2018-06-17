import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators,Form} from '@angular/forms';
import {HttpModule,Http,Response} from '@angular/http';
import {University} from '../university';
import {course} from '../course';
import {MatPaginator, MatTableDataSource, MatSort,MatAutocompleteModule} from '@angular/material';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  data: any;
  
   
  uni: University[];
  course: course[];

  courseForm:FormGroup;
  unicourseForm:FormGroup;
  hasSubmitted: boolean;
  hasSubmitted2: boolean;
  private dataSource;
  displayedColumns = [ 'u_id', 'c_id','options'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb:FormBuilder,private http:Http) { }

  ngOnInit() {
    this.getdata();  

    this.unicourseForm=new FormGroup({
      id: new FormControl(''),
      u_id:new FormControl('',Validators.required),
      c_id:new FormControl('',Validators.required)
    })
  }
  


  public onSubmit(){
    if(this.unicourseForm.invalid)
    {
      this.hasSubmitted2=true;
      alert("Fill details properly");
    }
    else{
      this.hasSubmitted2=false;
      let str=this.unicourseForm.value;
      console.log(str);
      var url = "http://localhost:3000/unicourse/uni_course";
        this.http.post(url,str).subscribe(( res:Response) => {
     
             console.log(res);
    })
  }}

  public getdata()
  {    
    var strurl="http://localhost:3000/unicourse/uni_course"; 
    this.http.get(strurl).subscribe(( res2:Response) => {
    let str=res2.json();
    this.dataSource=new MatTableDataSource<University>(res2.json());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort=this.sort; 
    })

    var strurl="http://localhost:3000/courseapi/course"; 
    this.http.get(strurl).subscribe(( res2:Response) => {
    let str=res2.json();
    this.course=str;
    console.log(this.course);
    })

    var url="http://localhost:3000/uniapi/uni"; 
    this.http.get(url).subscribe(( res:Response) =>{
    let str2=res.json();
    this.uni=str2;
    console.log(this.uni);
    })
}
public removeItem(index)
{
  var con=confirm("Want to delete record?"+index);
  if(con)
  {
  var strurl="http://localhost:3000/unicourse/uni_course/"+index;
  this.http.delete(strurl).subscribe((res:Response)=> alert("Deleted Successfully"));
  }
}
public editItem(s)
  {
    console.log(s);
    this.unicourseForm.controls.id.setValue(s.id);
    this.unicourseForm.controls.u_id.setValue(s.u_id);
    this.unicourseForm.controls.c_id.setValue(s.c_id);

  }
  public update(){
    if(this.unicourseForm.invalid)
    {
      this.hasSubmitted=true;
      alert("Fill Properly");
    }
    else{
      this.hasSubmitted=false;
      
      let str=this.unicourseForm.value;
      console.log(str);
    var url = "http://localhost:3000/unicourse/uni_course";
         this.http.put(url,str).subscribe(( res:Response) => {
     
              console.log(res);
        
              
     })
    }
  }
  public cancel(){
    this.unicourseForm.controls.id.setValue('');
    this.unicourseForm.controls.c_id.setValue('');
    this.unicourseForm.controls.u_id.setValue('');
  }
}

