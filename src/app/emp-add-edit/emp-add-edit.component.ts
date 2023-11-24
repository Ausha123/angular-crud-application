import {Component, Inject, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormControlName, FormGroup, FormControl, FormGroupDirective} from "@angular/forms";
import {EmployeeService} from "../services/employee.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../core/core.service";



@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {


  education: String[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ]

  //
  // constructor(private _fb: FormBuilder) {
  //   this.NewEmpForm = this._fb.group({
  //     firstName: '',
  //     lastName:'',
  //     email:'',
  //     dateofbirth:'',
  //     gender:'',
  //     education:'',
  //     company:'',
  //     experience:'',
  //     package:'',
  //
  //   });
  // }


  constructor(private _empservice: EmployeeService,private _dialogRef: MatDialogRef<EmpAddEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,private _coreService: CoreService) {
  }


  newEmpForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    dateofbirth: new FormControl(),
    gender: new FormControl(),
    education: new FormControl(),
    company: new FormControl(),
    experience: new FormControl(),
    pack: new FormControl(),

  })

  addEmployee(formDirective: FormGroupDirective) {
    let firstName:string = this.newEmpForm.get('firstName')?.value;
    let lastName:string = this.newEmpForm.get('lastName')?.value;
    let email:string = this.newEmpForm.get('email')?.value;
    let dateofbirth:string = this.newEmpForm.get('dateofbirth')?.value;
    let gender:string = this.newEmpForm.get('gender')?.value;
    let education:string = this.newEmpForm.get('education')?.value;
    let company:string = this.newEmpForm.get('company')?.value;
    let experience:number = this.newEmpForm.get('experience')?.value;
    let pack:number = this.newEmpForm.get('pack')?.value


    const data = {
       firstName: firstName,
       lastName: lastName,
       email: email,
       dateofbirth:dateofbirth,
       gender:gender,
       education:education,
       company:company,
       experience:experience,
       pack:pack
    }


    // this._empservice.addEmployee(data).subscribe((res:any)=>{
    //   alert("Success");
    // },error1 => {console.log(error1)});


    if(this.data){
      this._empservice.updateEmployee(this.data.id,this.newEmpForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Employee Updated!');
          this._dialogRef.close(true);
        },
        error: (err:any) => {
          console.error(err);
        }
      })
    }else {
      this._empservice.addEmployee(data).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Employee added successfully!');
          this._dialogRef.close(true);
        },
        error: (err:any) => {
          console.error(err);
        }
      })
    }



  }

  ngOnInit(): void {
    this.newEmpForm.patchValue(this.data);
  }



  clearFields(formDirective: FormGroupDirective, form: FormGroup): void {
    form.reset(); // Reset form data
    formDirective.resetForm(); // Reset the ugly validators
  }



}
