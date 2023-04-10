import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarmenComponent } from './barmen.component';

describe('BarmenComponent', () => {
  let component: BarmenComponent;
  let fixture: ComponentFixture<BarmenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarmenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
