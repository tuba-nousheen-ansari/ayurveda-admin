import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../service/category.service';
import { MedicineService } from '../service/medicine.service';

@Component({
  selector: 'app-view-medicine',
  templateUrl: './view-medicine.component.html',
  styleUrls: ['./view-medicine.component.css']
})
export class ViewMedicineComponent implements OnInit {
  storedMedicine: any;
  productId: any;
  currentCatId: any;
  currentCatName: any = [];
  categoryIdArr: any = [];

  constructor(private medicineService: MedicineService, categoryService: CategoryService,private toastr:ToastrService) {
    medicineService.viewProduct().subscribe(data => {
      this.storedMedicine = data;

    });


  }

  ngOnInit(): void {
  }
  getId(event: any) {
    if(confirm('Are you sure?')){
      this.productId = event.target.value;
    this.medicineService.deleteProduct(this.productId).subscribe(data => {
      this.toastr.error('Successfully deleted', 'Error');
      location.reload();
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status >= 400) {
          this.toastr.error('Cannot Delete', 'Error');
        }
      }
    });
    }
    
  }
}