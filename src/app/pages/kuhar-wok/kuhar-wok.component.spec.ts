import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuharWokComponent } from './kuhar-wok.component';

describe('KuharWokComponent', () => {
  let component: KuharWokComponent;
  let fixture: ComponentFixture<KuharWokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KuharWokComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KuharWokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
