import { Component, OnInit } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

   isMenuOpen = false;
   public categories: Array<ICategoryResponse> = [];

   constructor(
    private categoryService: CategoryService
  ) {}

   ngOnInit(): void {
    this.loadCategories();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  loadCategories(): void {
    this.categoryService.getAllFirebase().subscribe((data) => {
    this.categories = data as ICategoryResponse[];
    });
  }

}
