import { Component, OnInit, ViewChild } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

import { UtilsService } from '../../../services/utils.service';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ASCSort, SORD_DIRECTION } from 'app/models/sort';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import PerfectScrollbar from 'perfect-scrollbar';

export class Option {
  OptionName: string;
  OptionValue: number;
  constructor(optionName: string, optionValue: number) {
    this.OptionName = optionName;
    this.OptionValue = optionValue;
  }
}

export enum CentralAreaNodeType {
  'Central' = 1,
  'Area' = 2
}

interface GroupCentralAreaNode {
  name: string;
  id: number;
  type: CentralAreaNodeType;
  deep: number;
  selected: boolean;
  parent_id: number | null;
  children?: GroupCentralAreaNode[];
}

export class Group {
  Parent: number | null;
  GroupName: string;
  GroupId: number | null;
  constructor(parent: number | null, groupName: string, groupId: number | null) {
    this.Parent = parent;
    this.GroupName = groupName;
    this.GroupId = groupId;
  }
}

// Group users
interface GroupNode {
  name: string;
  isUser: boolean;
  id: number;
  children?: GroupNode[];
}

const GROUP_TREE_DATA: GroupNode[] = [
  {
    id: 1,
    isUser: false,
    name: 'Quản trị',
    children: [
      {
        id: 2,
        isUser: false,
        name: 'Nóm 1'
      },
      {
        id: 3,
        isUser: false,
        name: 'Nóm 2',
        children: [
          {
            id:  4,
            isUser: true,
            name: 'Nhân sự 1'
          },
          {
            id:  5,
            isUser: true,
            name: 'Nhân sự 2'
          }
        ]
      },
      {
        id: 6,
        isUser: false,
        name: 'Nóm 3',
        children: [
          {
            id:  7,
            isUser: true,
            name: 'Nhân sự 1'
          },
          {
            id:  8,
            isUser: true,
            name: 'Nhân sự 2'
          },
          {
            id:  9,
            isUser: true,
            name: 'Nhân sự 3'
          }
        ]
      },
      {
        id: 10,
        isUser: false,
        name: 'Nóm 4'
      },
    ]
  }
];

interface GroupFlatNode {
  expandable: boolean;
  name: string;
  id: number;
  isUser: boolean;
  level: number;
}

@Component({
  selector: 'app-decentralize-data',
  templateUrl: './decentralize-data.component.html',
  styleUrls: ['./decentralize-data.component.scss']
})

export class DecentralizeDataComponent implements OnInit {
  inheritanceRightsOptions: any = { name: 'MESSAGE.NameList.InheritanceRights', items: []};
  selectedInheritanceRightsOption: number = null;
  addNewPermissionsOptions: any = { name: 'MESSAGE.NameList.AddNewPermissions', items: []};
  selectedAddNewPermissionsOption: number = null;
  revokeOptions: any = { name: 'MESSAGE.NameList.RevokeTheOldRight', items: []};
  selectedRevokeOption: number = null;

  selectedGroup: GroupFlatNode = null;
  currentUser: any;
  loading: boolean;
  
  new_data = [];
  tree: any[] = [];
  current_parent = null;

  private _transformerGroup = (node: GroupNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      id: node.id,
      isUser: node.isUser,
      name: node.name,
      level: level,
    };
  }

  groupTreeControl = new FlatTreeControl<GroupFlatNode>(
      node => node.level, node => node.expandable);

  groupTreeFlattener = new MatTreeFlattener(
      this._transformerGroup, node => node.level, node => node.expandable, node => node.children);

  dataSourceGroup = new MatTreeFlatDataSource(this.groupTreeControl, this.groupTreeFlattener);

  hasChildGroup = (_: number, node: GroupFlatNode) => node.expandable;

  constructor(public utilsService: UtilsService, config: NgbModalConfig, private router: Router, private modalService: NgbModal, private http: HttpClient) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.initializationValues();
  }

  initializationValues() {

    this.inheritanceRightsOptions.items = [
      new Option('MESSAGE.NameList.DoNotApply', 1), // Do not apply option
      new Option('MESSAGE.NameList.InheritedFromGroup', 2) // Inherited from group option
    ];

    this.addNewPermissionsOptions.items = [
      new Option('MESSAGE.NameList.DoNotApply', 1), // Do not apply option
      new Option('MESSAGE.NameList.AppliesToTheNearestSubordinate', 2), // Applies to the nearest subordinate option
      new Option('MESSAGE.NameList.AppliesToAllSubordinates', 3) // Applies to all subordinates option
    ];

    this.revokeOptions.items = [
      new Option('MESSAGE.NameList.RevokeAll', 1), // Revoke all option
      new Option('MESSAGE.NameList.NoRevocation', 2) // No revocation option
    ];

    this.dataSourceGroup.data = GROUP_TREE_DATA;
    var temp = this.dataSourceGroup.data[0];
    this.selectedGroup = {
        expandable : !!temp.children && temp.children.length > 0,
        id: temp.id,
        isUser: temp.isUser,
        name: temp.name,
        level: 0,
    };

    const centralAreasRightsList: GroupCentralAreaNode[]  = [
      {
        name: 'Trung tâm 1',
        id: 1,
        parent_id: null,
        type: CentralAreaNodeType.Central,
        deep: 0,
        selected: false,
        children: [
           {
             name: 'Khu vực 1',
             id: 1,
             type: CentralAreaNodeType.Area,
             parent_id: 1,
             deep: 1,
             selected: false,
             children: []
           },
           {
             name: 'Khu vực 2',
             id: 2,
             type: CentralAreaNodeType.Area,
             parent_id: 1,
             deep: 1,
             selected: false,
             children: []
           },
           {
             name: 'Khu vực 3',
             id: 3,
             type: CentralAreaNodeType.Area,
             parent_id: 1,
             deep: 1,
             selected: false,
             children: []
           },
           {
             name: 'Khu vực 4',
             id: 4,
             type: CentralAreaNodeType.Area,
             parent_id: 1,
             deep: 1,
             selected: false,
             children: []
           },
           {
             name: 'Khu vực 5',
             id: 5,
             type: CentralAreaNodeType.Area,
             parent_id: 1,
             deep: 1,
             selected: false,
             children: []
           },
           {
             name: 'Khu vực 6',
             id: 6,
             type: CentralAreaNodeType.Area,
             parent_id: 1,
             deep: 1,
             selected: false,
             children: []
           },
           {
             name: 'Khu vực 7',
             id: 7,
             type: CentralAreaNodeType.Area,
             parent_id: 1,
             deep: 1,
             selected: false,
             children: []
           },
           {
             name: 'Khu vực 8',
             id: 8,
             type: CentralAreaNodeType.Area,
             parent_id: 1,
             deep: 1,
             selected: false,
             children: []
           },
           {
             name: 'Khu vực 9',
             id: 9,
             type: CentralAreaNodeType.Area,
             parent_id: 1,
             deep: 1,
             selected: false,
             children: []
           }
        ]
      },
      {
        name: 'Trung tâm 2',
        id: 2,
        type: CentralAreaNodeType.Central,
        parent_id: null,
        deep: 0,
        selected: false,
        children: [
           {
             name: 'Khu vực 1',
             id: 10,
             type: CentralAreaNodeType.Area,
             parent_id: 2,
             deep: 1,
             selected: false,
             children: []
           },
           {
             name: 'Khu vực 2',
             id: 11,
             type: CentralAreaNodeType.Area,
             parent_id: 2,
             deep: 1,
             selected: false,
             children: []
           }
        ]
      }
    ];

    this.get_children(centralAreasRightsList);
    this.tree = this.new_data;
  }

  checked = false;
  indeterminate = false;

  ngOnInit() {
    const vgscroll = <HTMLElement>document.querySelector('.vg-scroll');
    new PerfectScrollbar(vgscroll);
  }

  save() {
    console.log(this.selectedGroup);
    console.log(this.selectedInheritanceRightsOption, this.selectedAddNewPermissionsOption, this.selectedRevokeOption);
    console.log(this.tree);
  }

  toggle(event, tag) {
    const checked: boolean = event.checked;
    let supTagsList = this.tree.filter((t: any) => t.parent == tag.id);
    if(tag.type == CentralAreaNodeType.Central) {
      if(checked) {
        if (supTagsList.length > 0) {
          supTagsList.forEach(function(t: GroupCentralAreaNode) {
             t.selected = true;
          });
        }
      } else {
       if (supTagsList.length > 0) {
          supTagsList.forEach(function(t: GroupCentralAreaNode) {
             t.selected = false;
          });
        }
      }
    }
  }

  logNode(node: GroupFlatNode) {
     this.selectedGroup = node;
  }

  get_children(data){
    var i = 0;
    while(i<data.length)
    {
      this.current_parent = data[i];
      this.new_data.push({ selected: this.current_parent.selected, type: this.current_parent.type, deep: this.current_parent.deep, id: this.current_parent.id, name: this.current_parent.name, parent: this.current_parent.parent_id})
      if(this.current_parent.children.length < 0){
        continue;
      }
      else if(this.current_parent.children.length > 0){
        this.get_children(this.current_parent.children);
      }
      i++;
    }
  }

  CentralAreaNodeType() {
    return CentralAreaNodeType;
  }
}