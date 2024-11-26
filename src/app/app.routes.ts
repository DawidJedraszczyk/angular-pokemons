import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'cars',
    },
    {
        path: 'cars', component: HomeComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})


export class AppRoutingModule { }