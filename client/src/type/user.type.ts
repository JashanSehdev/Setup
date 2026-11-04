
export type User = {
    id : string;
    username : string;
    email : string;
    role : string
    createAt : string;
    updatedAt : string;  
    avatar : string | null
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: "ADMIN" | "USER";
  status: "ACTIVE" | "BLOCKED";
  createdAt: string;
}