import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

/** @title Select with multiple selection */
@Component({
  selector: 'select-multiple-example',
  templateUrl: 'select-multiple-example.html',
  styleUrls: ['select-multiple-example.css'],
})
export class SelectMultipleExample implements OnInit {
  custonDropdown = new FormControl();
  filterControl = new FormControl();
  filteredOptions: Observable<Array<OptionItem>>;
  optionItems: Array<OptionItem>;

  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  ngOnInit() {
    this.optionItems = this.toppingList.map((item) => {
      return {
        name: item,
        show: true,
      };
    });
    this.filteredOptions = this.filterControl.valueChanges.pipe(
      startWith(''),
      map((value: string) => {
        this.optionItems.forEach((option) => {
          option.show = option.name
            .toLocaleLowerCase()
            .includes(value.toLowerCase());
        });
        return this.optionItems;
      })
    );
  }

  onPanelClose() {
    this.filterControl.setValue('');
  }
}
export interface OptionItem {
  name: string;
  show: boolean;
}

/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
