/**
 * Created by nsolorzano on 6/7/2017.
 */
import {inject} from 'aurelia-framework';
import {WebAPI} from './web-api';

@inject(WebAPI)
export class App {
  constructor(api) {
    this.api = api;
  }
  configureRouter(config, router) {
    config.title = 'Work History';
    config.map([
      { route: '',              moduleId: 'about',      title: 'About Me'},
      { route: 'jobs/:id',      moduleId: 'job-detail', name: 'jobs'     }
    ]);
    this.router = router;
  }
}
