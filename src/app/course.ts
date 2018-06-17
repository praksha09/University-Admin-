export class course
{
  public c_id:number;
  public c_name :string;
  public duration :number;
  public details:string;
  public del:number;
  constructor(id:number,name:string,dur:number,details:string,del:number)
  {
     this.c_id = id;
     this.c_name = name;
     this.duration = dur;
     this.details=details;
     this.del=del;

  }

}