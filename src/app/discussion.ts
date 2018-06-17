export class discussion
{
  public id :number;
  public user_id :number;
  public dis_id :number;
  public type :string;
  public msg :string;
  public reply :string;
  public type_id:number

  constructor(id:number,user_id :number,dis_id :number,type :string,msg:string,reply :string,type_id:number)
  {
     this.id = id;
     this.type_id=type_id;
     this.user_id = user_id; 
     this.dis_id=dis_id;
     this.type=type;
     this.msg=msg;
     this.reply=reply;
  }
}