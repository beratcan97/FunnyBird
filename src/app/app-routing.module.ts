import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from './components/start-page/start-page.component';
import { FlappyComponent } from './components/flappy/flappy.component';

const routes: Routes = [
  { path: '', component: StartPageComponent},
  { path: 'flappyDrive', component: FlappyComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    // RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
