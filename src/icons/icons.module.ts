import {NgModule} from '@angular/core';
import {TablerIconsModule} from 'angular-tabler-icons';
import {
  IconArrowDown,
  IconFilter,
  IconX
} from 'angular-tabler-icons/icons';

// Select some icons (use an object, not an array)
const icons = {
  IconArrowDown,
  IconFilter,
  IconX
};

@NgModule({
  imports: [TablerIconsModule.pick(icons)],
  exports: [TablerIconsModule],
})
export class IconsModule {
}
