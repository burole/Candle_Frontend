import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { User } from "@/types";
import { QueryCategory } from "@/types/query";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeUser(user: any): User {
  if (!user) return user;
  
  return {
    name: user.name || '',
    email: user.email || '',
    role: user.role || 'USER',
    phone: user.phone,
  };
}


export const getPriorityCategory = (categories: QueryCategory[]) => {
    if (categories.includes(QueryCategory.CREDIT)) return QueryCategory.CREDIT;
    if (categories.includes(QueryCategory.VEHICLE)) return QueryCategory.VEHICLE;
    if (categories.includes(QueryCategory.COMPANY)) return QueryCategory.COMPANY;
    if (categories.includes(QueryCategory.PERSON)) return QueryCategory.PERSON;
    return categories[0];
  };