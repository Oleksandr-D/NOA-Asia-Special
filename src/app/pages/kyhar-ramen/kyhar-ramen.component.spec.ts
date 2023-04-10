import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KyharRamenComponent } from './kyhar-ramen.component';

describe('KyharRamenComponent', () => {
  let component: KyharRamenComponent;
  let fixture: ComponentFixture<KyharRamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KyharRamenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KyharRamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
