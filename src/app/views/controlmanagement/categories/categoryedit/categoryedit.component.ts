import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';
import { CategoryService } from '../../../../services/controlmanagement/category.service';
import { Category } from '../../../../models/controlmanagement/category';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../../../shared/modal/confirm/confirm.component';

@Component({
	selector: 'app-category-edit',
	templateUrl: './categoryedit.component.html',
	styleUrls: ['./categoryedit.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class CategoryEditComponent implements OnInit {
	@Input('popup') popup: boolean;
	@Input('ID') ID: null | number;
	currentUser: any;

	category: Category = new Category(0, '', '', false, new Date(), null, 1, null, null, null);

	constructor(public activeModal: NgbActiveModal, config: NgbModalConfig, private modalService: NgbModal, private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) {
		this.ID = this.route.snapshot.queryParams['ID'];
		config.backdrop = 'static';
     		config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}  
	GetCategoryById(ID: number)  
	{  
		const _this = this;
		if(ID){
			this.categoryService.getCategory(ID).subscribe((category: Category) => {
				_this.category = category;
				if (_this.category == null || _this.category.ID == null) {
					_this.category = new Category(0, '', '', false, new Date(), null, 1, null, null, null);
				}
			});
		} else {
			_this.category = new Category(0, '', '', false, new Date(), null, 1, null, null, null);
		}
	}
	ngOnInit() {
		this.GetCategoryById(this.ID);  
	}

	ReturnList() {
		this.router.navigate(['controlmanagement/categories']); 
	}

	UpdateCategory() {
		const _this = this;
		this.categoryService.addOrUpdateCategory(_this.category, this.currentUser.UserId).subscribe((result: any) => {
			if (result) {
				if(!_this.popup) {
					_this.ReturnList();
				} else {
					_this.closeMe();
				}
			} else {
				const modalRef = _this.modalService.open(ConfirmComponent, { size: 'lg' });
			}
		});
	}

	closeMe() {
		this.activeModal.close();
	}
}
