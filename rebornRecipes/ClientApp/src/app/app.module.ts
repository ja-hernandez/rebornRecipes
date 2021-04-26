import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbRatingModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { ForkRecipeComponent } from './components/fork-recipe/fork-recipe.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImportExternalRecipeComponent } from './import-external-recipe/import-external-recipe.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AddRecipeComponent,
    RecipeDetailsComponent,
    RecipesListComponent,
    ForkRecipeComponent,
    ImportExternalRecipeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    NgbRatingModule,
    RouterModule.forRoot([
      { path: '', component: RecipesListComponent, pathMatch: 'full' },
      { path: 'add-recipe', component: AddRecipeComponent, canActivate: [AuthorizeGuard], pathMatch: 'full'},
      { path: 'add-recipe/:id', component: AddRecipeComponent, canActivate: [AuthorizeGuard] },
      { path: 'fork-recipe', component: ForkRecipeComponent, canActivate: [AuthorizeGuard] },
      { path: 'recipe-list', component: RecipesListComponent },
      { path: 'recipe/:id', component: RecipeDetailsComponent, pathMatch: 'full' },
      { path: 'add-random', component: ImportExternalRecipeComponent, canActivate: [AuthorizeGuard]}
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
