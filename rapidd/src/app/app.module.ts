import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { NgChartsModule } from 'ng2-charts';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    NgChartsModule,
    MatPaginatorModule,
    MatSortModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
