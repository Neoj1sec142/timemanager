import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDisplayComponent } from './components/main-display/main-display.component';

const routes: Routes = [
  { path: "", component: MainDisplayComponent, pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
