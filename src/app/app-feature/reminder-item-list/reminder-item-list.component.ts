import { Component, OnInit } from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {IReminderError} from '../../_redux/interface/IReminderError';

@Component({
  selector: 'app-reminder-item-list',
  templateUrl: './reminder-item-list.component.html',
  styleUrls: ['./reminder-item-list.component.scss']
})
export class ReminderItemListComponent implements OnInit {

  @select(['reminder', 'reminders'])
  readonly reminders$: Observable<Array<IReminderError>>;

  constructor() { }

  ngOnInit() {
  }

}
