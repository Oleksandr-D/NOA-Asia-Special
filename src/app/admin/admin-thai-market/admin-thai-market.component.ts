import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryRequest, ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from '../../shared/services/image/image.service';
import { ThaiMarketService } from 'src/app/shared/services/thai-market/thai-market.service';

@Component({
  selector: 'app-admin-thai-market',
  templateUrl: './admin-thai-market.component.html',
  styleUrls: ['./admin-thai-market.component.scss']
})
export class AdminThaiMarketComponent implements OnInit {
  public adminThaiCategories: Array<ICategoryResponse> = [];
  public categoryForm!: FormGroup;
  public editStatus = false;
  public uploadPercent = 0;
  public isUploaded = false;
  private currentCategoryId!:string | number;

  constructor(
    private fb: FormBuilder,
    private thaiMarketService: ThaiMarketService,
    private toastr: ToastrService,
    private imageService: ImageService,
  ) {}

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories(); 
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required],
      thai:[true],
    });
  }

  loadCategories(): void {
    this.thaiMarketService.getAllFirebase().subscribe((data) => {
      this.adminThaiCategories = data as ICategoryResponse[];
    });
  }

  addCategory(): void {
    this.categoryForm.value.thai = true;
    if (this.editStatus) {
      this.thaiMarketService.updateFirebase(
          this.categoryForm.value,
          this.currentCategoryId as string
        )
        .then(() => {
          this.loadCategories();
          this.toastr.success('Категорію успішно оновлено!');
        });
    } else {
      this.thaiMarketService.createFirebase(this.categoryForm.value).then(() => {
        this.loadCategories();
        this.toastr.success('Категорію успішно додано!');
      });
       }
    this.editStatus = false;
    this.categoryForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }

  editCategory(category: ICategoryResponse): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath,
      thai:category.thai
    });
    this.editStatus = true;
    this.currentCategoryId = category.id;
    this.isUploaded = true;
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }

  deleteCategory(category: ICategoryResponse): void {
    if (confirm('Видалити цю катигорію?')) {
        this.thaiMarketService .deleteFirebase(category.id as string).then(() => {
        this.loadCategories();
        this.toastr.success('Категорію успішно видалено!');
         });
    }
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadPercent = this.imageService.uploadPercent;
    this.imageService.uploadFile('images', file.name, file).then((data) => {
        this.categoryForm.patchValue({
          imagePath: data,
        });
        if (this.uploadPercent === 100) {
          this.isUploaded = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteImage(): void {
    this.imageService
      .deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        alert('Файл видалено');
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.categoryForm.patchValue({
          imagePath: null,
        });
      });
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }

}







