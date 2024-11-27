import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsdisplayComponent } from './eventsdisplay.component';

describe('EventsdisplayComponent', () => {
  let component: EventsdisplayComponent;
  let fixture: ComponentFixture<EventsdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsdisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
