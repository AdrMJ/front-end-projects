import { ImageUrl } from './../image-url/image-url';
import { Authors } from "../authors/authors";
import { Details } from "../details/details";
import { IntroWords } from "../intro-words/intro-words";
import { Publication } from "../publication/publication";

export interface Book {
    id: number;
    title: string;
    isStillAvailable: number;
    
// Relationships between classes
    
    authors: Authors;
    details: Details;
    publication: Publication;
    imageUrl: ImageUrl;
    introWords?: IntroWords[];
}