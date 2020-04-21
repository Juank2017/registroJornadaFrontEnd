import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcadoComponent } from './marcado.component';

describe('MarcadoComponent', () => {
  let component: MarcadoComponent;
  let fixture: ComponentFixture<MarcadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
