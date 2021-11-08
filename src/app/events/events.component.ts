import { Component, OnInit } from '@angular/core';

export interface Location {
  venue: string;
  address: string;
  city: string;
  phone: string;
}

export interface Event {
  startDate: Date;
  endDate: Date;
  location: Location;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  pastEvents: Event[] = [
    {
      startDate: new Date(),
      endDate: new Date(),
      location: {
        venue: 'venue 1',
        address: 'mainstreet 1',
        city: 'amsterdam',
        phone: '123456'
      }
    },
    {
      startDate: new Date(),
      endDate: new Date(),
      location: {
        venue: 'venue 2',
        address: 'mainstreet 2',
        city: 'hillegom',
        phone: '123456'
      }
    },
  ]

  futureEvents: Event[] = [
    {
      startDate: new Date(),
      endDate: new Date(),
      location: {
        venue: 'venue 1',
        address: 'mainstreet 1',
        city: 'amsterdam',
        phone: '123456'
      }
    },
    {
      startDate: new Date(),
      endDate: new Date(),
      location: {
        venue: 'venue 2',
        address: 'mainstreet 2',
        city: 'hillegom',
        phone: '123456'
      }
    },
  ]

  language: string = 'dutch';

  constructor() { }

  ngOnInit(): void {
  }
  selectLanguage(language: string) {
    this.language = language
    // console.log(language)
  }
}
