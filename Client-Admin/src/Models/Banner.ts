import { PageObject } from "./Common";

export type BannerGet = {
    slideId: number;
    title: string;
    link: string;
    imageUrl: string;
    status: boolean;
    description: string;
  };

  export type SupplierResponse = {
    items: BannerGet[];
    page: PageObject;
  }

  export type BannerPost = {
    title: string;
    link: string;
    imageFile: File;
    description: string;
    status: boolean;
};

