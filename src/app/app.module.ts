import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostDashboardComponent } from './shared/components/post-dashboard/post-dashboard.component';
import { PostFormComponent } from './shared/components/post-form/post-form.component';
import { PostCardComponent } from './shared/components/post-card/post-card.component';
import { GetConfirmedComponent } from './shared/components/get-confirmed/get-confirmed.component';
import { MaterialModule } from './shared/modules/material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderInterceptor } from './shared/interceptor/loader.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    PostDashboardComponent,
    PostFormComponent,
    PostCardComponent,
    GetConfirmedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:LoaderInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
