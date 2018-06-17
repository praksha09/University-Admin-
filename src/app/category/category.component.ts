import { Component, OnInit, ViewChild } from '@angular/core';
import {University} from './../University';
import {FormControl,Validators,FormGroup} from '@angular/forms';
import { Http ,HttpModule,Response} from '@angular/http';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { category } from '../category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  cat: any;

categoryForm:FormGroup;
private university:University;
hasSubmitted: boolean;

private dataSource;
  displayedColumns = [ 'cat_id', 'category','options'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private http:Http) { }

  ngOnInit() {
    this.getdata();
    this.categoryForm=new FormGroup({
      cat_id:new FormControl(''),
      category:new FormControl('',Validators.required)
    });
  }
  public onFormSubmit(){
    if(this.categoryForm.invalid)
    {
      this.hasSubmitted=true;
    alert("Add properly");
    }
    else{
      this.hasSubmitted=false;
      let str=this.categoryForm.value;
      console.log(str);
    var url = "http://localhost:3000/catapi/cat";
         this.http.post(url,str).subscribe(( res:Response) => {
     
              console.log(res);
         })
  }
}
public getdata(){
  var strurl="http://localhost:3000/catapi/cat"; 
    this.http.get(strurl).subscribe(( res2:Response) =>{ this.cat=res2.json();
    this.dataSource=new MatTableDataSource<category>(res2.json());
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
    var strurl="http://localhost:3000/catapi/cat/"+index;
    this.http.delete(strurl).subscribe((res:Response)=> alert("Deleted Successfully"));
    }
   
  }

  public editItem(c)
  {
    this.categoryForm.controls.cat_id.setValue(c.cat_id);
    this.categoryForm.controls.category.setValue(c.category);
  }

  public update(){
    if(this.categoryForm.invalid)
    {
      this.hasSubmitted=true;
      alert("Fill Properly");
    }
    else{
      this.hasSubmitted=false;
      
      let str=this.categoryForm.value;
      console.log(str);
    var url = "http://localhost:3000/catapi/cat";
         this.http.put(url,str).subscribe(( res:Response) => {
     
              console.log(res);
    })
    }
  }
  public cancel(){
    this.categoryForm.controls.cat_id.setValue('');
    this.categoryForm.controls.category.setValue('');
  }

}
