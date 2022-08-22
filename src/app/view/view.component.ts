import { Component, OnInit, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';

import { ApiService } from '../shared/api.service';
import { EmployeedashboardComponent } from '../employeedashboard/employeedashboard.component';
import { FormBuilder,FormGroup } from '@angular/forms';
import { EmployeModel } from '../employee_dashboard';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { Routes, Router, RouterModule, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs';



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
Id:any;
  data: any;
  http: any;
  
  constructor(private route:ActivatedRoute,private api:ApiService) { 
    
  }

  ngOnInit(): void {
     this.route.paramMap.subscribe(
    //   this.api.getEmployee()
    // .subscribe(res=>{
    //   this.employeeData=res;
    // })
      (params)=>
      {
        this.Id = params.get("id");
        if(this.Id){
          this.api.getEmploye1(this.Id).subscribe(
            (EmployeModelObj)=>{
              console.log(EmployeModelObj);
            }
            
          )
        }
      }
     )
  }

}

function Id(Id: any): any {
  throw new Error('Function not implemented.');
}

