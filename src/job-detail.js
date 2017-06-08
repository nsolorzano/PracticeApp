/**
 * Created by nsolorzano on 6/7/2017.
 */
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {JobUpdated, JobViewed} from './messages';
import {areEqual} from './utility';

@inject(WebAPI, EventAggregator)
export class JobDetail {
  constructor(api, ea) {
    this.api = api;
    this.ea = ea;
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
    let job = this.api.getJobDetails(params.id);
    this.job = job;
    this.routeConfig.navModel.setTitle(job.company);
    this.originalJob = JSON.parse(JSON.stringify(job));
    this.ea.publish(new JobViewed(this.job));
  }

  get canSave() {
    return this.job.company && this.job.title && !this.api.isRequesting;
  }

  save() {
    let job = this.api.saveJob(this.job);
    this.job = job;
    this.routeConfig.navModel.setTitle(job.company);
    this.originalJob = JSON.parse(JSON.stringify(job));
    this.ea.publish(new JobUpdated(this.job));
  }

  canDeactivate() {
    if (!areEqual(this.originalJob, this.job)) {
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');
      if (!result) {
        this.ea.publish(new JobViewed(this.job));
      }
      return result;
    }
    return true;
  }
}
