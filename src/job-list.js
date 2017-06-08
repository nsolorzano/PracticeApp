/**
 * Created by nsolorzano on 6/7/2017.
 */
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {JobUpdated, JobViewed} from './messages';
import {inject} from 'aurelia-framework';

@inject(WebAPI, EventAggregator)
export class JobList {
  constructor(api, ea) {
    this.api = api;
    this.jobs = [];
    ea.subscribe(JobViewed, msg => this.select(msg.job));
    ea.subscribe(JobUpdated, msg => {
      let id = msg.job.id;
      let found = this.jobs.find(x => x.id === id);
      Object.assign(found, msg.job);
    });
  }

  created() {
    this.jobs = this.api.getJobList();
  }

  select(job) {
    this.selectedId = job.id;
    return true;
  }
}
