import { PageObject } from "./Common";

export type SliderGet = {
    slideId: number;
    title: string;
    link: string;
    imageUrl: string;
    status: boolean;
    description: string;
};

export type Slideresponse = {
  items: SliderGet[];
  page: PageObject;
}
