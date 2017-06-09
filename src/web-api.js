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
    duties: 'Test software and other stuff...',
    startDate: '2016-08',
    endDate: ''
  },
  {
    id: getId(),
    company: 'Kepware Technologies',
    title: 'Quality Assurance Engineer',
    duties: 'Software test plan management and development. ' +
            'Manual and automated Test Case Management using Team Foundation Server (TFS) and Microsoft Test Manager (MTM). ' +
            'Quality control through detailed and accurate software testing, with measured results and engineering feedback processes.',
    startDate: '2014-08',
    endDate: '2016-08'
  },
  {
    id: getId(),
    company: 'Rufus Deering Lumber Company',
    title: 'IT Management Intern',
    duties: 'IT Management and stuff...',
    startDate: '2014-01',
    endDate: '2014-08'
  },
  {
    id: getId(),
    company: 'Browne Trading Company',
    title: 'Fresh Seafood Product Manager',
    duties: 'Keep fish fresh and stuff...',
    startDate: '2009-08',
    endDate: '2011-11'
  },
  {
    id: getId(),
    company: 'Lone Star Construction Company',
    title: 'Carpenter',
    duties: 'Build Everything...',
    startDate: '1996-01',
    endDate: '2008-04'
  },
  {
    id: getId(),
    company: 'USAF @ Little Rock AFB',
    title: 'Aircraft Fuels System Specialist',
    duties: 'Fix aeroplanes and stuff...',
    startDate: '2001-11',
    endDate: '2005-04'
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
