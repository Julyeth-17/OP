import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoPersonajeComponent } from './ingreso-personaje.component';

describe('IngresoPersonajeComponent', () => {
  let component: IngresoPersonajeComponent;
  let fixture: ComponentFixture<IngresoPersonajeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresoPersonajeComponent]
    });
    fixture = TestBed.createComponent(IngresoPersonajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
