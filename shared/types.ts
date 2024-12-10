export enum Subject {
    Maths = 'Maths',
    English = 'English',
    Physics = 'Physics',
    Chemistry = 'Chemistry',
    Compsci = 'Compsci',
    Languages = 'Languages',
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
  export interface Lesson {
    id?: number
    title: string
    description: string
    price: number
    subject: Subject
    level: Level
    startTime: string,
    endTime: string
    createdAt?: string
    updatedAt?: string
  }
  export interface Guide {
    id?: number
    title: string
    description: string
    price: number
    subject: Subject
    level: Level
    createdAt? : string
    updatedAt?: string
  }
  export interface Order {
    id?: number
    status: OrderStatus
    totalPrice: number
    customerId: number
    guideId?: number
    lessonId?: number
    createdAt?: string
    updatedAt?: string
  }
  export interface GuideWithAuthor extends Guide {
    author: User
    orders: Order[]
  }
  export const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };
  
