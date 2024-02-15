import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BookDetailsComponent } from './main-pages/book-details/book-details.component';
import { LeftPanelComponent } from './main-pages/book-details/elements/left-panel/left-panel.component';
import { RightPanelComponent } from './main-pages/book-details/elements/right-panel/right-panel.component';
import { MenuComponent } from './shared/menu/menu.component';
import { BlackSmokeAnimationComponent } from './shared/animations/black-smoke-animation/black-smoke-animation.component';
import { CloudsAndStarsComponent } from './shared/animations/clouds-and-stars/clouds-and-stars.component';
import { ColorfulSmokeAnimationComponent } from './shared/animations/colorful-smoke-animation/colorful-smoke-animation.component';
import { WhiteSmokeAnimationComponent } from './shared/animations/white-smoke-animation/white-smoke-animation.component';
import { NavComponent } from './shared/menu/elements/nav/nav.component';
import { LogosComponent } from './shared/menu/elements/logos/logos.component';
import { FooterComponent } from './shared/menu/elements/footer/footer.component';
import { RouterModule, provideRouter } from '@angular/router';
import { CoverComponent } from './main-pages/book-details/elements/cover/cover.component';
import { SecNavComponent } from './shared/menu/elements/sec-nav/sec-nav.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BookDetailsComponent,
    LeftPanelComponent,
    RightPanelComponent,
    NavComponent,
    MenuComponent,
    LogosComponent,
    FooterComponent,
    SecNavComponent,
    BlackSmokeAnimationComponent,
    CloudsAndStarsComponent,
    ColorfulSmokeAnimationComponent,
    WhiteSmokeAnimationComponent,
    CoverComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideRouter([])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
