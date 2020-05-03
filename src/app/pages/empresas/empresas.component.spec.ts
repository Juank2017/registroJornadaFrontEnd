import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasComponent } from './empresas.component';

import { EmpresasService } from '../../services/empresas/empresas.service';

import {  Observable } from 'rxjs-compat';
import 'rxjs-compat/add/observable/from';
import { of, from } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Empresa } from '../../models/empresa.model';

describe('EmpresasComponent', () => {
  // let component: EmpresasComponent;
 // const servicio = new EmpresasService(null);
  let getEmpresasSpy: any;
  let servicio: any;
  const empresas =  {
    paginacion: {
        registros: 5,
        paginas: 1
    },
    empresas: [
        {
            id: 1,
            nombre: 'ACME SA2',
            cif: 'A11545252'
        },
        {
            id: 2,
            nombre: 'UMBRELLA',
            cif: 'B11545252'
        },
        {
            id: 3,
            nombre: 'dia',
            cif: 'a11452525'
        },
        {
            id: 4,
            nombre: 'majorel',
            cif: 'b11525252'
        },
        {
            id: 8,
            nombre: 'Juan Carlos',
            cif: 'A115452523'
        }
    ]
};
  let component: any;
  let fixture: any;
  let serviciStub: Partial<EmpresasService>;
  beforeEach(async(() => {
    serviciStub = {
      getEmpresas(pagina: any){
        return from([ empresas]);
      },
      createEmpresa(empresa: Empresa){
        return from( [empresa]);
      }
    };
  



    TestBed.configureTestingModule({
     declarations: [ EmpresasComponent],
    providers: [{ provide: EmpresasService, useValue: serviciStub}]
   });
    fixture = TestBed.createComponent(EmpresasComponent);

    servicio = TestBed.inject(EmpresasService);

  } ) );


  it('should create', async(() => {
    component = fixture.componentInstance;
    expect(component.empresas.length).toBeGreaterThan(0);
  }));
});
