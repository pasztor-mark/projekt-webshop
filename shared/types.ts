export enum Subject {
    Maths = 'Maths',
    English = 'English',
    Physics = 'Physics',
    Chemistry = 'Chemistry',
    Compsci = 'Compsci',
    Foreign = 'Foreign Languages',
    History = 'History',
    Economics = 'Economics',
    Art = 'Art',
  }
  export enum Level {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced = 'Advanced',
    Expert = 'Expert',
  }
  export enum OrderStatus {
    Pending = 'Pending',
    Paid = 'Paid',
    Canceled = 'Canceled',
  }
  
  export interface User {
    id?: number,
    email: string,
    name: string,
    password: string,
    address?: string,
    phoneNumber?: string,
    updatedAt?: string,
    createdAt?: string,
  }
  