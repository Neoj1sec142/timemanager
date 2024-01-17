import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDisplayComponent } from './components/main-display/main-display.component';
import { HoursTableComponent } from './components/hours-table/hours-table.component';

const routes: Routes = [
  { path: "", component: MainDisplayComponent, pathMatch: "full" },
  { path: "hours", component: HoursTableComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
