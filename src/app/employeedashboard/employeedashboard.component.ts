import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { EmployeModel } from '../employee_dashboard';
import { ApiService } from '../shared/api.service';
// import { EmployeModel } from '../employee_dashboard';
import { ActivatedRoute, Router } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.css']
})
export class EmployeedashboardComponent implements OnInit {
  title = 'Angular 4 Project!';
  display!: string;
formValue!:FormGroup;
employeModelObj:EmployeModel=new EmployeModel();
employeData !:any;
  employeeData: any;
  showAdd!:boolean;
  showUpdate!:boolean;
  message: any;
  apiService: any;
  showCancel!: boolean;
  
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  constructor(private router: Router,
    private formbuilder:FormBuilder,
    private route: ActivatedRoute,
    private api:ApiService){}

    

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      firstName:[""],
      lastName:[""],
      email:[""],
      mobile:[""],
     
    })
    this.getAllEmploye();

  }
  
  
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postEmployeDetails(){
    this.employeModelObj.firstName=this.formValue.value.firstName;
    this.employeModelObj.lastName=this.formValue.value.lastName;
    this.employeModelObj.email=this.formValue.value.email;
    this.employeModelObj.mobile=this.formValue.value.mobile;
    

    this.api.postEmploye(this.employeModelObj)
    .subscribe((res: any)=>{
      console.log(res);
      alert("Employee added Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmploye();
    },
      (    err: any)=>{
      alert("Sometging went wrong");
    })
    
  }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  getAllEmploye(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData=res;
    })
  }
  deleteEmployee(row:any){
    var result = confirm("Are you sure to delete ? " +row.id);
    if(result){
      this.api.deleteEmployee(row.id)
      .subscribe(res=>{
       
        this.getAllEmploye();
      })
    }
    
    
  }
  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeModelObj.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
  }
  updateEmployeeDetails(){
    this.employeModelObj.firstName=this.formValue.value.firstName;
    this.employeModelObj.lastName=this.formValue.value.lastName;
    this.employeModelObj.email=this.formValue.value.email;
    this.employeModelObj.mobile=this.formValue.value.mobile;
    this.api.updateEmploye(this.employeModelObj,this.employeModelObj.id)
    .subscribe(res=>{
      alert("Updated successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmploye();
    })
  }
  onView(row:any){
    
    this.showAdd=false;
    this.showUpdate=false;
    this.employeModelObj.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
  }
  // table data added 
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
