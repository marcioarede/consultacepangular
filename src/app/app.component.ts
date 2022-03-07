import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CepServiceService } from './cep-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ConsultaCep';

  consultaCepForm: FormGroup;

  retornoValido: string;ß

  ngOnInit(){
    
  }

  constructor(
    private cepService: CepServiceService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) 
  {
    this.createForm();
  }

  consultarCep(){
    let cep = this.consultaCepForm.controls['cep'].value;
      this.cepService.buscar(cep).subscribe((dados) =>{
        this.popularForm(dados, this.consultaCepForm)
      },
      err => {
        console.log(err);
      });
  }


  createForm(){
    this.consultaCepForm = this.formBuilder.group({
      cep: [''],
      logradouro: [''],
      complemento: [''],
      bairro: [''],
      localidade: [''],
      uf: [''],
      ibge: [''],
      gia: [''],
      ddd: [''],
      siafi: ['']
    });
  }
 
  
  popularForm(dados, form){

    if(dados.erro == true){
      this.snackBar.open('CEP não encontrado', 'fechar',{
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }else{
      form.patchValue({
        cep: dados.cep,
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        complemento: dados.complemento,
        localidade: dados.localidade, 
        ibge: dados.ibge,
        gia: dados.gia,
        ddd: dados.ddd,
        siafi: dados.siafi,
        uf: dados.uf
      })
      this.retornoValido = "valido";
    }   
    
  }
  resetaDadosForm(){
    this.retornoValido = 'asdas';
    this.consultaCepForm.reset();
  }

}
