import { NgModule, Pipe, Injectable, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './../backend.service';

@Pipe({
  name: 'finishedTasks',
  pure: false
})
@Injectable()
export class FinishedTaskFilter implements PipeTransform {
  transform(items: Task[]): any {
    return items.filter(item => item.status === 'finished');
  }
}


@NgModule({
  declarations: [
    FinishedTaskFilter
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FinishedTaskFilter
  ]
})
export class PipeModule {
  // static forRoot() {
  //     return {
  //         ngModule: PipeModule,
  //         providers: [FinishedTaskFilter],
  //     };
  //  }
}
