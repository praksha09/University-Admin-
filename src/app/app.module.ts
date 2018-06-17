import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';


import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseComponent } from './course/course.component';
import { UniversityComponent } from './university/university.component';
import { ViewComponent } from './view/view.component';
import { SviewComponent } from './sview/sview.component';
import { CviewComponent } from './cview/cview.component';
import { FilterPipe, OrderPipe } from './filter.pipe';
import { CityviewComponent } from './cityview/cityview.component';
import { IconComponent } from './icon/icon.component';
import { Component } from '@angular/core/src/metadata/directives';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSortModule,MatAutocompleteModule,MatFormFieldModule,MatInputModule,} from '@angular/material';
import { DiscussionComponent } from './discussion/discussion.component';




@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    DashboardComponent,
    CourseComponent,
    UniversityComponent,
    ViewComponent,
    SviewComponent,
    CviewComponent,
    FilterPipe,
    OrderPipe,
    CityviewComponent,
    IconComponent,
    DiscussionComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatAutocompleteModule,    
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:'dashboard',
        component:DashboardComponent

      },
      {
        path:'category',
        component:CategoryComponent
      },
      {
        path:'course',
        component:CourseComponent
      },
      {
        path:'university',
        component:UniversityComponent
      },
      {
        path:'view',
        component:ViewComponent
      },
      {
        path:'sview',
        component:SviewComponent
      },
      {
        path:'cview',
        component:CviewComponent
      },
      {
        path:'cityview',
        component:CityviewComponent
      },
      {
        path:'icon',
        component:IconComponent
      },
      {
        path:'discussion',
        component:DiscussionComponent
      }
    ])
  ],
  providers: [FilterPipe,OrderPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
