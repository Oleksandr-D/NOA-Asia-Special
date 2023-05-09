import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminThaiMarketComponent } from './admin-thai-market.component';

describe('AdminThaiMarketComponent', () => {
  let component: AdminThaiMarketComponent;
  let fixture: ComponentFixture<AdminThaiMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminThaiMarketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminThaiMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
