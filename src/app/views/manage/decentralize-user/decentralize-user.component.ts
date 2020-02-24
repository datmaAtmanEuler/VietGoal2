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

export class Function {
  FunctionName: string;
  FunctionId: number;
  constructor(functionName: string, functionId: number) {
    this.FunctionName = functionName;
    this.FunctionId = functionId;
  }
}

export class Controller {
  ControllerName: string;
  ControllerId: number;
  constructor(controllerName: string, controllerId: number) {
    this.ControllerName = controllerName;
    this.ControllerId = controllerId;
  }
}

export class Action {
  ParentId: number | null = null;
  ControllerName: string;
  ControllerId: number;
  ActionName: string | null;
  ActionId: number | null;
  constructor(parentId: number | null = null, controllerName: string, controllerId: number, actionName: string | null, actionId: number | null) {
    this.ParentId = parentId;
    this.ControllerName = controllerName;
    this.ControllerId = controllerId;
    this.ActionName = actionName;
    this.ActionId = actionId;
  }
}

export class FunctionType {
  FunctionTypeName: string;
  FunctionTypeId: number;
  constructor(functionTypeName: string, functionTypeId: number) {
    this.FunctionTypeName = functionTypeName;
    this.FunctionTypeId = functionTypeId;
  }
}

export class FunctionTypeWithCheckbox {
  FunctionTypeName: string;
  FunctionTypeId: number;
  Select: boolean;
  constructor(functionTypeName: string, functionTypeId: number, select: boolean = false) {
    this.Select = select;
    this.FunctionTypeName = functionTypeName;
    this.FunctionTypeId = functionTypeId;
  }
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

interface GroupRightsNode {
  name: string;
  parent_id: number | null;
  id: number;
  deep: number;
  options: FunctionTypeWithCheckbox[];
  children?: GroupRightsNode[];
}

export class GroupInheritanceRight {
  GroupName: string;
  GroupId: number;
  ControllerId: number;
  ActionId: number | null;
  SelectedTypes: FunctionType[] | null = [];
  constructor(groupName: string, groupId: number, controllerId: number, actionId: number, selectedTypes: FunctionType[] | null) {
    this.GroupName = groupName;
    this.GroupId = groupId;
    this.ControllerId = controllerId;
    this.ActionId = actionId;
    this.SelectedTypes = selectedTypes;
  }
}

const GROUP_RIGHTS_TREE_DATA: GroupRightsNode[] = [
  {
    id: 1,
    parent_id: null,
    deep: 0,
    options: [
      new FunctionTypeWithCheckbox('MESSAGE.NameList.View', 1),
      new FunctionTypeWithCheckbox('MESSAGE.NameList.Create', 2),
      new FunctionTypeWithCheckbox('MESSAGE.NameList.Edit', 3),
      new FunctionTypeWithCheckbox('MESSAGE.NameList.Delete', 4),
      new FunctionTypeWithCheckbox('MESSAGE.NameList.Option', 5)
    ],
    name: 'MESSAGE.NameList.System',
    children: [
      {
        id: 2,
        parent_id: 1,
        deep: 1,
        options: [
          new FunctionTypeWithCheckbox('MESSAGE.NameList.View', 1),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Create', 2),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Edit', 3),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Delete', 4),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Option', 5)
        ],
        name: 'MESSAGE.NameList.Setting',              
        children:[]
      },
      {
        id: 3,
        parent_id: 1,
        deep: 1,
        options: [
          new FunctionTypeWithCheckbox('MESSAGE.NameList.View', 1),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Create', 2),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Edit', 3),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Delete', 4),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Option', 5)
        ],
        name: 'MESSAGE.NameList.User',              
        children:[]
      }
    ]
  },
  {
    id: 4,
    parent_id: null,
    deep: 0,
    options: [],
    name: 'MESSAGE.NameList.List',
    children: [
      {
        id:  5,
        parent_id: 4,
        deep: 1,
        options: [
          new FunctionTypeWithCheckbox('MESSAGE.NameList.View', 1),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Create', 2),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Edit', 3),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Delete', 4),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Option', 5)
        ],
        name: 'MESSAGE.NameList.Centrals',              
        children:[]
      },
      {
        id:  6,
        parent_id: 4,
        deep: 1,
        options: [
          new FunctionTypeWithCheckbox('MESSAGE.NameList.View', 1),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Create', 2),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Edit', 3),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Delete', 4),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Option', 5)
        ],
        name: 'MESSAGE.NameList.Areas',              
        children:[]
      },
      {
        id:  7,
        parent_id: 4,
        deep: 1,
        options: [
          new FunctionTypeWithCheckbox('MESSAGE.NameList.View', 1),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Create', 2),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Edit', 3),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Delete', 4),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Option', 5)
        ],
        name: 'MESSAGE.NameList.Yards',              
        children:[]
      },
      {
        id:  8,
        parent_id: 4,
        deep: 1,
        options: [
          new FunctionTypeWithCheckbox('MESSAGE.NameList.View', 1),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Create', 2),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Edit', 3),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Delete', 4),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Option', 5)
        ],
        name: 'MESSAGE.NameList.TrainingGrounds',              
        children:[]
      },
      {
        id:  9,
        parent_id: 4,
        deep: 1,
        options: [
          new FunctionTypeWithCheckbox('MESSAGE.NameList.View', 1),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Create', 2),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Edit', 3),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Delete', 4),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Option', 5)
        ],
        name: 'MESSAGE.NameList.Provinces',              
        children:[]
      },
      {
        id:  10,
        parent_id: 4,
        deep: 1,
        options: [
          new FunctionTypeWithCheckbox('MESSAGE.NameList.View', 1),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Create', 2),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Edit', 3),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Delete', 4),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Option', 5)
        ],
        name: 'MESSAGE.NameList.Districts',              
        children:[]
      },
      {
        id:  11,
        parent_id: 4,
        deep: 1,
        options: [
          new FunctionTypeWithCheckbox('MESSAGE.NameList.View', 1),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Create', 2),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Edit', 3),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Delete', 4),
          new FunctionTypeWithCheckbox('MESSAGE.NameList.Option', 5)
        ],
        name: 'MESSAGE.NameList.DataAxis',
        children: [
          {
            id: 12,
            parent_id: 11,
            deep: 2,
            options: [
              new FunctionTypeWithCheckbox('MESSAGE.NameList.View', 1),
              new FunctionTypeWithCheckbox('MESSAGE.NameList.Create', 2),
              new FunctionTypeWithCheckbox('MESSAGE.NameList.Edit', 3),
              new FunctionTypeWithCheckbox('MESSAGE.NameList.Delete', 4),
              new FunctionTypeWithCheckbox('MESSAGE.NameList.Option', 5)
            ],
            name: 'MESSAGE.NameList.List',
            children: [
              {
                id:  13,
                parent_id: 12,
                deep: 3,
                options: [
                  new FunctionTypeWithCheckbox('MESSAGE.NameList.View', 1),
                  new FunctionTypeWithCheckbox('MESSAGE.NameList.Create', 2),
                  new FunctionTypeWithCheckbox('MESSAGE.NameList.Edit', 3),
                  new FunctionTypeWithCheckbox('MESSAGE.NameList.Delete', 4),
                  new FunctionTypeWithCheckbox('MESSAGE.NameList.Option', 5)
                ],
                name: 'MESSAGE.NameList.Ages',              
                children:[]
              }
            ]
          }
        ]
      }
    ]
  }
];

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
  selector: 'app-decentralize-user',
  templateUrl: './decentralize-user.component.html',
  styleUrls: ['./decentralize-user.component.scss']
})
export class DecentralizeUserComponent implements OnInit {
  inheritanceRightsOptions: any = { name: 'MESSAGE.NameList.InheritanceRights', items: []};
  selectedInheritanceRightsOption: number = null;
  addNewPermissionsOptions: any = { name: 'MESSAGE.NameList.AddNewPermissions', items: []};
  selectedAddNewPermissionsOption: number = null;
  revokeOptions: any = { name: 'MESSAGE.NameList.RevokeTheOldRight', items: []};
  selectedRevokeOption: number = null;
  controllersActionsList: Action[] = [];
  functionTypesList: FunctionType[] = [];

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

    this.controllersActionsList = [
      new Action(null, 'MESSAGE.NameList.System', 1, null, null),
      new Action(1, 'MESSAGE.NameList.Setting', 2, null, null),
      new Action(1, 'MESSAGE.NameList.User', 3, null, null),
      new Action(1, 'MESSAGE.NameList.List', 4, null, null),
      new Action(4, 'MESSAGE.NameList.Centrals', 5, null, null),
      new Action(4, 'MESSAGE.NameList.Areas', 6, null, null),
      new Action(4, 'MESSAGE.NameList.Yards', 7, null, null),
      new Action(4, 'MESSAGE.NameList.TrainingGrounds', 8, null, null),
      new Action(4, 'MESSAGE.NameList.Provinces', 9, null, null),
      new Action(4, 'MESSAGE.NameList.Districts', 10, null, null),
      new Action(4, 'MESSAGE.NameList.Wards', 11, null, null)
    ];

    this.functionTypesList = [
      new FunctionType('MESSAGE.NameList.View', 1),
      new FunctionType('MESSAGE.NameList.Create', 2),
      new FunctionType('MESSAGE.NameList.Edit', 3),
      new FunctionType('MESSAGE.NameList.Delete', 4),
      new FunctionType('MESSAGE.NameList.Option', 5)

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
    console.log (this.selectedGroup);
    this.get_children(GROUP_RIGHTS_TREE_DATA);
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

  toggle(tag, i) {
    if(tag.options && tag.options.length  > 0) {
      tag.options[i].Select = !tag.options[i].Select;
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
      this.new_data.push({ options: this.current_parent.options, deep: this.current_parent.deep, id: this.current_parent.id, name: this.current_parent.name, parent: this.current_parent.parent_id})
      if(this.current_parent.children.length < 0){
        continue;
      }
      else if(this.current_parent.children.length > 0){
        this.get_children(this.current_parent.children);
      }
      i++;
    }
  }
}