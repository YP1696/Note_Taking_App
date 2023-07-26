import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MicComponent } from './mic/mic.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  { path : '' , component : AppComponent},
  { path : 'mic' , component : MicComponent},
  { path : 'home' , component : HomeComponent},
  { path : 'setting', component : SettingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
