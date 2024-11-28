import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsdashComponent } from './eventsdash.component';

describe('EventsdashComponent', () => {
  let component: EventsdashComponent;
  let fixture: ComponentFixture<EventsdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsdashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
