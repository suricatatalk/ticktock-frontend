import { NgModule, Pipe, Injectable, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './../backend.service';
import * as moment from 'moment';

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

@Pipe({
  name: 'formatDate',
  pure: false
})
@Injectable()
export class DateFormatter implements PipeTransform {
  transform(seconds: number): any {
    let unix = moment.unix(seconds);
    return unix.format('MM-DD-YYYY HH:ss');
  }
}

@Pipe({
  name: 'formatTime',
  pure: false
})
@Injectable()
export class TimeFormatter implements PipeTransform {
  transform(seconds: number): any {
    let duration = moment.duration(seconds, 'seconds');
    let output = '';
    if (duration.days() > 0) {
      output = duration.days() + 'days ';
    }
    return output + duration.hours() + ':' + duration.minutes() + ':' + duration.seconds();
  }
}


@Pipe({
  name: 'eventType',
  pure: false
})
@Injectable()
export class EventTypeFormatter implements PipeTransform {
  transform(type: number): any {
    switch (type) {
      case 0:
        return 'start';
      case 1:
        return 'pause';
      case 2:
        return 'finish';
    }
    return '' + type;
  }
}

@NgModule({
  declarations: [
    FinishedTaskFilter, TimeFormatter, DateFormatter,EventTypeFormatter
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FinishedTaskFilter, TimeFormatter, DateFormatter,EventTypeFormatter
  ]
})
export class PipeModule {
}
