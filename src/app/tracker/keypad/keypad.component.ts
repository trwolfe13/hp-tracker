import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../state';
import * as HP from '../state/characters/character/hp';
import * as Keypad from '../state/keypad';

@Component({
  selector: 'app-keypad',
  templateUrl: 'keypad.component.html',
  styleUrls: ['./keypad.component.scss']
})
export class KeypadComponent {
  buttons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  keypad: Keypad.KeypadState;

  constructor(private store: Store<AppState>) {
    this.store.select(s => s.tracker.keypad).subscribe(k => this.keypad = k);
  }

  pressNum(num: number) {
    this.store.dispatch(new Keypad.NumberPressed(num));
  }

  pressClear() {
    this.store.dispatch(new Keypad.Clear());
  }

  pressHeal() {
    this.store.dispatch(new HP.Heal(Number(this.keypad.value)));
    this.store.dispatch(new Keypad.Clear());
  }

  pressHurt() {
    this.store.dispatch(new HP.Hurt(Number(this.keypad.value)));
    this.store.dispatch(new Keypad.Clear());
  }
}
