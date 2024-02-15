import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../modules/book/book';

@Injectable({
    providedIn: 'root'
})
export class BookService {
    url = 'http://localhost:8080/';

    constructor(private http: HttpClient) { }

    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(`${this.url}all`);
    }

    getBookByCategory(category: string): Observable<Book[]> {
        return this.http.get<Book[]>(`${this.url}category/${category}`);
    }

    getBookById(id: number): Observable<Book> {
        return this.http.get<Book>(`${this.url}id/${id}`);
    }
}
