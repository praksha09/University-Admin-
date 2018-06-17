import { Component, OnInit, ViewChild } from '@angular/core';

import { Http ,Response} from '@angular/http';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { icon } from '../icon';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {
  image: any;
  cat: any;
  hasSubmitted: boolean;
  iconForm: FormGroup;

  private dataSource;
  displayedColumns = [ 'id', 'u_id','icon','options'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http:Http) { }

  ngOnInit() {
    this.getdata();
    this.iconForm=new FormGroup({
      id:new FormControl(''),
      u_id:new FormControl('',Validators.required),
      icon:new FormControl('',Validators.required)
    });
  }
  public onFormSubmit(){
    if(this.iconForm.invalid)
    {
      this.hasSubmitted=true;
    alert("Add properly");
    }
    else{
      this.hasSubmitted=false;
      let str=this.iconForm.value;
      console.log(str);
    var url = "http://localhost:3000/iconapi/icon";
         this.http.post(url,str).subscribe(( res:Response) => {
     
              console.log(res);
         })
  }
}
public getdata(){
  var strurl="http://localhost:3000/iconapi/icon"; 
    this.http.get(strurl).subscribe(( res2:Response) =>{ this.image=res2.json();
    this.dataSource=new MatTableDataSource<icon>(res2.json());
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
    var strurl="http://localhost:3000/iconapi/icon/"+index;
    this.http.delete(strurl).subscribe((res:Response)=> alert("Deleted Successfully"));
    }
   
  }

  public editItem(i)
  {
    console.log(i);
    this.iconForm.controls.id.setValue(i.id);
    this.iconForm.controls.u_id.setValue(i.u_id);
    this.iconForm.controls.icon.setValue(i.icon);
  }

  public update(){
    if(this.iconForm.invalid)
    {
      this.hasSubmitted=true;
      alert("Fill Properly");
    }
    else{
      this.hasSubmitted=false;
      
      let str=this.iconForm.value;
      console.log(str);
    var url = "http://localhost:3000/iconapi/icon";
         this.http.put(url,str).subscribe(( res:Response) => {
     
              console.log(res);
    })
    }
  }
  public cancel(){
    this.iconForm.controls.id.setValue('');
    this.iconForm.controls.u_id.setValue('');
    this.iconForm.controls.icon.setValue('');
  }

}
