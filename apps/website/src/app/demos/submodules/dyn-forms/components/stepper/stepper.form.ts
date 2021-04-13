import { Validators } from '@angular/forms';
import { DynControlConfig } from '@myndpm/dyn-forms/core';
import { createMatConfig } from '@myndpm/dyn-forms/ui-material';

export function stepperForm(): DynControlConfig {
  return createMatConfig('CARD', {
    name: 'data',
    controls: [
      createMatConfig('INPUT', {
        name: 'firstName',
        params: { label: 'First Name *' },
        options: { validators: [Validators.required] },
      }),
      createMatConfig('INPUT', {
        name: 'lastName',
        params: { label: 'Last Name *' },
        options: { validators: [Validators.required] },
      }),
      createMatConfig('INPUT', {
        name: 'friendCode',
        params: { label: 'Friend Code' },
      }),
      createMatConfig('INPUT', {
        name: 'streetNumber',
        params: { label: 'Street Number *' },
        options: { validators: [Validators.required] },
      }),
      createMatConfig('INPUT', {
        name: 'islandName',
        params: { label: 'Island Name *' },
        options: { validators: [Validators.required] },
      }),
      createMatConfig('INPUT', {
        name: 'initialDeposit',
        params: { label: 'Initial Deposit *' },
        options: { validators: [Validators.required, Validators.min(0)] },
      }),
      createMatConfig('INPUT', {
        name: 'loanType',
        params: { label: 'Loan Type *' },
        options: { validators: [Validators.required] },
      }),
      createMatConfig('INPUT', {
        name: 'roofColor',
        params: { label: 'Roof Color *' },
        options: { validators: [Validators.required] },
      }),
    ],
  });
}
