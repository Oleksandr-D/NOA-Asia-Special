import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThaiMarketComponent } from './thai-market.component';

describe('ThaiMarketComponent', () => {
  let component: ThaiMarketComponent;
  let fixture: ComponentFixture<ThaiMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThaiMarketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThaiMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
