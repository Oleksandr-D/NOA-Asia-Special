import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from '../../shared/services/image/image.service';
import { ThaiMarketService } from 'src/app/shared/services/thai-market/thai-market.service';


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public adminCategories: Array<ICategoryResponse> = [];
  public adminThaiCategories: Array<ICategoryResponse> = [];
  public categoryForm!: FormGroup;
  public editStatus = false;
  public uploadPercent = 0;
  public isUploaded = false;
  private currentCategoryId!: number | string;
  public isThai:boolean = false;
  public allCategories: Array<ICategoryResponse> = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private imageService: ImageService,
    private thaiService: ThaiMarketService
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
      thai: [false],
    });
  }

  loadCategories(): void {
    this.categoryService.getAllFirebase().subscribe((data) => {
      this.adminCategories = data as ICategoryResponse[];
      this.thaiService.getAllFirebase().subscribe((data) => {
        this.adminThaiCategories = data as ICategoryResponse[];
        this.allCategories = [...this.adminCategories, ...this.adminThaiCategories];
      });
    });
  }

  addCategory(): void {
    if (this.editStatus && !this.categoryForm.controls['thai'].value ) {
      this.categoryService.updateFirebase(
          this.categoryForm.value,
          this.currentCategoryId as string
        )
        .then(() => {
          this.loadCategories();
          this.toastr.success('Категорію успішно оновлено!');
        });
    } 
    if (this.editStatus && this.categoryForm.controls['thai'].value ) {
      this.thaiService.updateFirebase(
          this.categoryForm.value,
          this.currentCategoryId as string
        )
        .then(() => {
          this.loadCategories();
          this.toastr.success('Категорію успішно оновлено!');
        });
    }
    if (this.categoryForm.controls['thai'].value){
      this.thaiService.createFirebase(this.categoryForm.value).then(() => {
      this.loadCategories();
      this.toastr.success('Категорію Thai-market успішно додано!');
       });
    }
    if (!this.categoryForm.controls['thai'].value){
      this.categoryService.createFirebase(this.categoryForm.value).then(() => {
      this.loadCategories();
      this.toastr.success('Категорію успішно додано!');
       });
    }


    // else {
    //     this.categoryService.createFirebase(this.categoryForm.value).then(() => {
    //     this.loadCategories();
    //     this.toastr.success('Категорію успішно додано!');
    //   });
    //    }
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
      thai: category.thai
    });
    this.editStatus = true;
    this.currentCategoryId = category.id as number;
    this.isUploaded = true;
    window.scroll({
      top:0,
      behavior:'smooth'
    })
  }

  deleteCategory(category: ICategoryResponse): void {
    if (confirm('Видалити цю катигорію?')) {
      if (!this.categoryForm.controls['thai'].value){
        this.categoryService.deleteFirebase(category.id as string).then(() => {
          this.loadCategories();
          this.toastr.success('Категорію успішно видалено!');
        })
      }
      if (this.categoryForm.controls['thai'].value){
        this.thaiService.createFirebase(this.categoryForm.value).then(() => {
        this.loadCategories();
        this.toastr.success('Категорію Thai-market успішно додано!');
         });
      }
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
