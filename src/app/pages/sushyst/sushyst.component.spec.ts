import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SushystComponent } from './sushyst.component';

describe('SushystComponent', () => {
  let component: SushystComponent;
  let fixture: ComponentFixture<SushystComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SushystComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SushystComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
