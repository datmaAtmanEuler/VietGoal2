import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from 'app/shared/modal/confirm/confirm.component';
import { Collection } from 'app/models/list/collection';
import { CollectionService } from 'app/services/list/collection.service';

@Component({
	selector: 'app-collection-edit',
	templateUrl: './collection-edit.component.html',
	styleUrls: ['./collection-edit.component.scss']
})
export class CollectionEditComponent implements OnInit {

	@Input() popup: boolean;
	@Input() CollectionId: number;
	@Output() capNhatThanhCong: EventEmitter<any> = new EventEmitter();

	Collection: Collection = new Collection();
	currentUser: any;

	constructor(public activeModal: NgbActiveModal, private CollectionService: CollectionService, config: NgbModalConfig, private modalService: NgbModal, private route: ActivatedRoute, private router: Router) {
		this.CollectionId = this.route.snapshot.queryParams['Id'];
		this.CollectionId = (this.CollectionId) ? this.CollectionId : 0;
		config.backdrop = 'static';
		config.keyboard = false;
		config.scrollable = false;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}
	GetCollectionById(CollectionId: number) {
		this.CollectionService.getCollection((CollectionId) ? CollectionId : this.CollectionId).subscribe(
			(object) => {
				this.Collection = object;
			},
			() => {
				this.Collection = new Collection();
			}
		);
	}
	ngOnInit() {
		this.GetCollectionById(this.CollectionId);
	}

	ReturnList() {
		this.router.navigate(['danhmuc/Collection']);

	}

	UpdateCollection() {
		this.CollectionService.addOrUpdateCollection(this.Collection).subscribe(
			() => {
				if (!this.popup) {
					this.ReturnList();
				} else {
					this.closeMe();
				}
			},
			() => {
				this.modalService.open(ConfirmComponent, { size: 'lg' });
			}
		);
	}

	closeMe() {
		this.activeModal.close();
	}

}
