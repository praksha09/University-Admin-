export class contact
{
  public id:number;
  public fname :string;
  public email:string;
  public sub:string;
  public msg:string;

  constructor(id1:number,fname:string,email:string,sub:string,msg:string)
  {
     this.id = id1;
     this.fname = fname;
     this.email = email;
     this.sub = sub;
     this.msg=msg;
  }

}