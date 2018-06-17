export class login
{
  public id:number;
  public user_id :number;
  public f_name :string;
  public l_name:string;
  public email:string;
  public pwd:string
  constructor(id1:number,uid:number,fname:string,lname:string,email:string,pwd:string)
  {
     this.id = id1;
     this.user_id = uid;
     this.f_name = fname;
     this.l_name = lname;
     this.email = email;
     this.pwd = pwd;
  }

}