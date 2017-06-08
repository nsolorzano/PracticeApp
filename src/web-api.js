/**
 * Created by nsolorzano on 6/7/2017.
 */
let id = 0;

function getId() {
  return ++id;
}

let jobs = [
  {
    id: getId(),
    company: 'PTC',
    title: 'Software Quality Engineer',
    duties: 'Dutie1',
    startDate: '2016-08',
    endDate: '2080-08'
  },
  {
    id: getId(),
    company: 'Kepware Technologies',
    title: 'Quality Assurance Engineer',
    duties: 'Software test plan management and development. Manual and automated Test Case Management using Team Foundation Server (TFS) and Microsoft Test Manager (MTM). Quality control through detailed and accurate software testing, with measured results and engineering feedback processes.',
    startDate: '2014-08',
    endDate: '2016-08'
  },
  {
    id: getId(),
    company: 'Job3',
    title: 'Title3',
    duties: 'Dutie3',
    startDate: '2014-02',
    endDate: '2014-02'
  },
  {
    id: getId(),
    company: 'Job4',
    title: 'Title4',
    duties: 'Dutie4',
    startDate: '2014-02',
    endDate: '2014-02'
  },
  {
    id: getId(),
    company: 'Job5',
    title: 'Title5',
    duties: 'Dutie5',
    startDate: '2014-02',
    endDate: '2014-02'
  },
  {
    id: getId(),
    company: 'Job6',
    title: 'Title6',
    duties: 'Dutie6',
    startDate: '2014-02',
    endDate: '2014-02'
  }
];

export class WebAPI {
  isRequesting = false;

  getJobList() {
    return jobs.map(x =>  {
      return {
        id: x.id,
        company: x.company,
        title: x.title,
        duties: x.duties,
        startDate: x.startDate,
        endDate: x.endDate
      };
    });
  }

  getJobDetails(id) {
    return jobs.filter(x => x.id == id)[0];
  }

  saveJob(job) {
    let instance = JSON.parse(JSON.stringify(job));
    let found = jobs.filter(x => x.id === job.id)[0];
    if (found) {
      let index = jobs.indexOf(found);
      jobs[index] = instance;
    } else {
      instance.id = getId();
      jobs.push(instance);
    }
    return instance;
  }
}
