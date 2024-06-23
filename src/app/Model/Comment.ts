export interface Comment {
    id?:number;
    postId :number;
    userId : number;
    content: string;
    email: string;
    votes?: number ;
    createdAt?: number;
    date?: any;
  }