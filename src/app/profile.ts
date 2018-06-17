
export class profile
{
  public user_id :number;
  public father :string;
  public mother:string;
  public add:string;
  public city:string;
  public state:string;
  public school:string;
  public per:number;
  public pass_year:number;
  public dream_uni:string;
  public join_year:string;

  constructor(uid:number,father:string,mother:string,add:string,city:string,state:string,school:string,per:number,pass_year:number,dream_uni:string,join_year:string)
  {
     this.user_id = uid;
     this.father = father;
     this.mother = mother;
     this.add = add;
     this.city = city;
     this.state=state;
     this.school=school;
     this.per=per;
    this.pass_year=pass_year;
    this.dream_uni=dream_uni;
    this.join_year=join_year;

  }

}