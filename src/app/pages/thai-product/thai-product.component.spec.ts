import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThaiProductComponent } from './thai-product.component';

describe('ThaiProductComponent', () => {
  let component: ThaiProductComponent;
  let fixture: ComponentFixture<ThaiProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThaiProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThaiProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
