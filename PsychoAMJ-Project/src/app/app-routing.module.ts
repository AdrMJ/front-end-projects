import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './main-pages/book-details/book-details.component';
import { BookListComponent } from './main-pages/book-list/book-list.component';

const routes: Routes = [
    {
        path: '', component: BookListComponent
    },
    {
        path: 'category/:category', component: BookListComponent
    },
    {
        path: 'all', component: BookListComponent
    },
    {
        path: 'id/:id', component: BookDetailsComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
