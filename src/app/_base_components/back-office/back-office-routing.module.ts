import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginBackComponent} from "./login-back/login-back.component";
import {BackOfficeModule} from "./back-office.module";

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
