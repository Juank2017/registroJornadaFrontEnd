import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcajesComponent } from './marcajes.component';

describe('MarcajesComponent', () => {
  let component: MarcajesComponent;
  let fixture: ComponentFixture<MarcajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
