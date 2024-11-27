import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsinfoComponent } from './eventsinfo.component';

describe('EventsinfoComponent', () => {
  let component: EventsinfoComponent;
  let fixture: ComponentFixture<EventsinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsinfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
