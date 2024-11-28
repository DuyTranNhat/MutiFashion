import { PageObject } from "./Common"
import { UserProfile } from "./User"

export interface ReviewResponse {
    page: PageObject
    items: ReviewGet[]
  }

  export interface ReviewGet {
    reviewId: number
    rating: any
    comment: string
    reviewDate: string
    customer: UserProfile
  }

  export interface ReviewPost {
    productId: number;
    customerId: number;
    comment: string;
}
  