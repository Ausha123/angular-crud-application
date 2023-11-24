import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../services/employee.service";


@Component({
  selector: 'app-all-emp',
  templateUrl: './all-emp.component.html',
  styleUrls: ['./all-emp.component.scss']
})
export class AllEmpComponent implements OnInit{
  ngOnInit(): void {
    this.getEmployeeList();
  }

  constructor(private _empservice: EmployeeService) {
  }

  getEmployeeList(){
      this._empservice.getEmployeeList().subscribe({
        next:(res)=>{
          console.log(res);
        },
        error:console.log,
      });
  }
}
