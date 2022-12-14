import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../service/category.service';
import { DiseaseService } from '../service/disease.service';

@Component({
  selector: 'app-edit-disease',
  templateUrl: './edit-disease.component.html',
  styleUrls: ['./edit-disease.component.css']
})
export class EditDiseaseComponent implements OnInit {
  dId: any;
  name: any;
  causes: any;
  homeRemedies: any;
  yogaLink: any;
  precaution: any;
  keyword: any;
  image: any;
  storedCat: any;
  catId: any;
  imageOld: any;
  category: any;
  currentCategoryName:any;
  constructor(private diseaseService: DiseaseService, private activatedRoute: ActivatedRoute, private categoryService: CategoryService, private router: Router,private taostr:ToastrService) {
    this.dId = activatedRoute.snapshot.paramMap.get('id');
    diseaseService.viewParticularDisease(this.dId).subscribe(data => {
      this.name = data.name;
      this.causes = data.causes;
      this.homeRemedies = data.homeRemedies;
      this.yogaLink = data.yogaLink;
      this.precaution = data.precaution;
      this.keyword = data.keyword;
      this.imageOld = data.image;

      this.category = data.category;
      categoryService.viewCategoryById(this.category).subscribe(dataCat=>{
        this.currentCategoryName=dataCat.name;
      });
    });
    categoryService.viewCategory().subscribe(data => {
      this.storedCat = data;

    });
  }

  ngOnInit(): void {
  }

  saveImage(event: any) {
    this.image = event.target.files[0];
  }
  getId(event: any) {
    this.catId = event.target.value;
  }
  updateDiseaseForm() {
    if (this.catId) {
      let formData = new FormData();
      formData.append('id', this.dId);
      formData.append('name', this.name);
      formData.append('causes', this.causes);
      formData.append('homeRemedies', this.homeRemedies);
      formData.append('yogaLink', this.yogaLink);
      formData.append('precaution', this.precaution);
      formData.append('category', this.catId);

      formData.append('oldImage', this.imageOld)
      formData.append('image', this.image);
      formData.append('keyword', this.keyword);
      this.diseaseService.updateDisease(formData).subscribe(data => {
      
      this.taostr.success('Updated Successfully','Successfull');
        
        this.router.navigate(['viewdis']);

      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400) {
            this.taostr.error('Cannot Update', 'Error');
          }
        }
      });
    }
    else {

      let formData = new FormData();
      formData.append('id', this.dId);
      formData.append('name', this.name);
      formData.append('causes', this.causes);
      formData.append('homeRemedies', this.homeRemedies);
      formData.append('yogaLink', this.yogaLink);
      formData.append('precaution', this.precaution);
      formData.append('category', this.category);
      formData.append('oldImage', this.imageOld)
      formData.append('image', this.image);
      formData.append('keyword', this.keyword);
      this.diseaseService.updateDisease(formData).subscribe(data => {
      this.taostr.success('Updated Successfully','Successfull');
        
        this.router.navigate(['viewdis']);

      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400) {
            this.taostr.error('Cannot Update', 'Error');
          }
        }
      });

    }
  }
}
