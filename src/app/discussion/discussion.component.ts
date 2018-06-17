import { Component, OnInit, ViewChild } from '@angular/core';
import {Http,Headers,Response, URLSearchParams, RequestOptions} from '@angular/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { discussion } from '../discussion';


@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {
  hasSubmitted: boolean;
  type: any;

  private dataSource;
  displayedColumns = [ 'type_id', 'type','options'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  typeForm:FormGroup;

  constructor(private http:Http) { }

  ngOnInit() {

    this.getdata();
    this.typeForm=new FormGroup({
      type_id:new FormControl(''),
      type:new FormControl('',Validators.required)
    })
  }
  public getdata(){
    var typeurl="http://localhost:3000/typeapi/type"; 
    this.http.get(typeurl).subscribe(( res2:Response) => {this.type=res2.json();
    this.dataSource=new MatTableDataSource<discussion>(res2.json());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort=this.sort;   
      console.log(this.dataSource.sort);
    })

  }
  public onFormSubmit(){
    if(this.typeForm.invalid)
    {
      this.hasSubmitted=true;
      alert("Fill Properly");
    }
    else{
      this.hasSubmitted=false;
      
      let str=this.typeForm.value;
      console.log(str);
      var url = "http://localhost:3000/typeapi/type";
        this.http.post(url,str).subscribe(( res:Response) => {
     
             console.log(res);
    })
    }
  }

  public removeItem(index)
  {
    var con=confirm("Want to delete record?"+index.type_id);
    if(con)
    {
    var strurl="http://localhost:3000/typeapi/type/"+index.type_id;
    this.http.delete(strurl).subscribe((res:Response)=> alert("Deleted Successfully"));
    }
  }

  public editItem(s)
  {
    
    this.typeForm.controls.type_id.setValue(s.type_id);
    this.typeForm.controls.type.setValue(s.type);

  }
  public update(){
    if(this.typeForm.invalid)
    {
      this.hasSubmitted=true;
      alert("Fill Properly");
    }
    else{
      this.hasSubmitted=false;
      
      let str=this.typeForm.value;
      console.log(str);
    var url = "http://localhost:3000/typeapi/type";
         this.http.put(url,str).subscribe(( res:Response) => {
     
              console.log(res);
        
              
     })
    }
  }
  public cancel(){
    this.typeForm.controls.type_id.setValue('');
    this.typeForm.controls.type.setValue('');
  }
}


