import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  generos: Array<any> = [
    { id: 1, descripcion: "Masculino" },
    { id: 2, descripcion: "Femenino" },
    { id: 3, descripcion: "Otro" },
  ]

  curriculumForm: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    dni: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]),
    genero: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, this.validarDominioMail]),
    telefono: new FormControl(''),
    apodo: new FormControl('', [], [this.validarApodo])
  });

  constructor() { }

  ngOnInit() {
  }

  enviarCurriculum() {
    console.log(this.curriculumForm);
  }

  limpiarCampos() {
    this.curriculumForm.reset({
      nombre: '', apellido: '', dni: '', genero: '', email: '', telefono: '', apodo: ''
    });
  }

  validarDominioMail(control: FormControl): { [s: string]: boolean } {
    return control.value.includes("@gmail") ? null : { nogmail: true };
  }

  validarApodo(control: FormControl): Promise<any> | Observable<any> {

    let promesa = new Promise((resolve, reject) => {
      setTimeout(
        () => control.value !== "tonto" ? resolve(null) : resolve({ apodoInvalido: true }), 2000
      )
    });

    return promesa;
  }
}
