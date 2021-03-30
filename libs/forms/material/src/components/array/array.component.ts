import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Inject,
  Injector,
  OnInit,
  SkipSelf,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  DynControl,
  DynControlConfig,
  DynFormArray,
  DynInstanceType,
} from '@matheo/dyn-forms/core';
import { DynArrayParams } from './array.component.params';

@Component({
  selector: 'dyn-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DynControl,
      useExisting: forwardRef(() => DynArrayComponent),
    },
  ],
})
export class DynArrayComponent
  extends DynFormArray<DynArrayParams, DynControlConfig>
  implements OnInit {
  static dynControl: 'ARRAY' = 'ARRAY';

  dynInstanceType = DynInstanceType;

  static createConfig(
    partial: Partial<DynControlConfig<DynArrayParams>>
  ): DynControlConfig<DynArrayParams> {
    return {
      ...(partial as DynControlConfig),
      control: DynArrayComponent.dynControl,
      instance: DynArrayComponent.dynInstance,
    };
  }

  constructor(
    injector: Injector,
    @Inject(DynControl) @SkipSelf() public readonly parent: DynControl
  ) {
    super(injector);
  }

  get items(): FormGroup[] {
    return this.control.controls as FormGroup[];
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  checkParams(params: Partial<DynArrayParams>): DynArrayParams {
    return {
      ...params,
      addButton: params.addButton || 'Add Item',
      addColor: params.addColor || 'primary',
      removeButton: params.removeButton || 'Remove',
      removeColor: params.removeColor || '',
    };
  }
}
