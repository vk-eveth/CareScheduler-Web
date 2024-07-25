import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CustomDatePipe } from './custom-date.pipe';

@NgModule({
  declarations: [CustomDatePipe],
  imports: [CommonModule],
  exports: [CustomDatePipe],
  providers: [DatePipe]
})
export class PipesModule {}
