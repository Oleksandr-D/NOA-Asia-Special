import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThaiProductInfoComponent } from './thai-product-info.component';

describe('ThaiProductInfoComponent', () => {
  let component: ThaiProductInfoComponent;
  let fixture: ComponentFixture<ThaiProductInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThaiProductInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThaiProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
