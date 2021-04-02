import { Injectable } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { DynBaseConfig } from './control-config.interface';
import { DynInstanceType } from './control.type';

@Injectable({
  providedIn: 'root',
})
export class DynFormService {
  constructor() {}

  register(
    instance: DynInstanceType.Container | DynInstanceType.Group,
    config: DynBaseConfig,
    parent: ControlContainer,
    recursively?: boolean
  ): FormGroup;
  register(
    instance: DynInstanceType.Array,
    config: DynBaseConfig,
    parent: ControlContainer,
    recursively?: boolean
  ): FormArray;
  register(
    instance: DynInstanceType.Control,
    config: DynBaseConfig,
    parent: ControlContainer,
    recursively?: boolean
  ): FormControl;
  register<T extends AbstractControl>(
    instance: DynInstanceType,
    config: DynBaseConfig,
    parent: ControlContainer,
    recursively = false
  ): T {
    // fail-safe validation
    if (!parent.control) {
      throw new Error(`03: the ControlContainer doesn't have a control`);
    }
    if (instance !== config.instance) {
      throw new Error(
        `04: Inconsistent [${config.control}] control instance "${instance}" for a config with "${config.instance}"`
      );
    }

    // return any existing control with this name
    let control = config.name ? parent.control.get(config.name) : null;
    if (control) {
      return control as T;
    }

    control = this.build(instance as any, config, recursively);
    if (!control) {
      throw new Error(`05: Could not build a control for ${instance}`);
    }

    if (config.name) {
      this.append(parent, config.name, control);
    }

    return control as T;
  }

  build(
    instance: DynInstanceType.Container | DynInstanceType.Group,
    config: DynBaseConfig,
    recursively: boolean
  ): FormGroup;
  build(
    instance: DynInstanceType.Array,
    config: DynBaseConfig,
    recursively: boolean
  ): FormArray;
  build(
    instance: DynInstanceType.Control,
    config: DynBaseConfig,
    recursively: boolean
  ): FormControl;
  build<T extends AbstractControl>(
    instance: DynInstanceType,
    config: DynBaseConfig,
    recursively = false
  ): T {
    switch (instance) {
      case DynInstanceType.Container:
      case DynInstanceType.Group:
        const control = new FormGroup({}, config.options);
        if (recursively) {
          config.controls?.forEach((item) => {
            control.addControl(
              item.name,
              this.build(item.instance as any, item, recursively)
            );
          });
        }
        return (control as unknown) as T;

      case DynInstanceType.Array:
        return (new FormArray([], config.options) as unknown) as T;

      case DynInstanceType.Control:
        return (new FormControl(null, config.options) as unknown) as T;
    }
  }

  append(parent: ControlContainer, name: string, control: AbstractControl) {
    // only FormGroup can be extended
    if (parent.control instanceof FormGroup) {
      parent.control.addControl(name, control);
    }
  }
}
