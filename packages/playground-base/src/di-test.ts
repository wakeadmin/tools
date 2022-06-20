import { configureDI, page, injectable, makeObservable, observable } from '@wakeadmin/framework';

@injectable()
@page()
export class Counter {
  @observable
  count: number = 0;

  constructor() {
    makeObservable(this);
  }

  add = () => {
    this.count++;
  };
}

declare global {
  interface DIMapper {
    'DI.demo.Counter': Counter;
  }
}

configureDI(({ registerPageClass }) => {
  registerPageClass('DI.demo.Counter', Counter);
});
