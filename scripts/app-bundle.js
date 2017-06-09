define('about',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var About = exports.About = function About() {
    _classCallCheck(this, About);

    this.aboutMeHeader = 'About Me';
    this.aboutMe = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. ' + 'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus' + ' mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa' + ' quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,' + ' rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.' + ' Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend' + ' tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem' + ' ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius' + ' laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur' + ' ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget' + ' condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam' + ' nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt' + ' tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci' + ' eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales' + ' sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.';
    this.aboutMePicture = 'src/images/Nate.jpg';
  };
});
define('app',['exports', 'aurelia-framework', './web-api'], function (exports, _aureliaFramework, _webApi) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_webApi.WebAPI), _dec(_class = function () {
    function App(api) {
      _classCallCheck(this, App);

      this.api = api;
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Work History';
      config.map([{ route: '', moduleId: 'about', title: 'About Me' }, { route: 'jobs/:id', moduleId: 'job-detail', name: 'jobs' }]);
      this.router = router;
    };

    return App;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('job-detail',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './web-api', './messages', './utility'], function (exports, _aureliaFramework, _aureliaEventAggregator, _webApi, _messages, _utility) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.JobDetail = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _dec, _class;

  var JobDetail = exports.JobDetail = (_dec = (0, _aureliaFramework.inject)(_webApi.WebAPI, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function JobDetail(api, ea) {
      _classCallCheck(this, JobDetail);

      this.api = api;
      this.ea = ea;
    }

    JobDetail.prototype.activate = function activate(params, routeConfig) {
      this.routeConfig = routeConfig;
      var job = this.api.getJobDetails(params.id);
      this.job = JSON.parse(JSON.stringify(job));
      this.routeConfig.navModel.setTitle(job.company);
      this.originalJob = JSON.parse(JSON.stringify(job));
      this.ea.publish(new _messages.JobViewed(this.job));
    };

    JobDetail.prototype.save = function save() {
      var job = this.api.saveJob(this.job);
      this.job = job;
      this.routeConfig.navModel.setTitle(job.company);
      this.originalJob = JSON.parse(JSON.stringify(job));
      this.ea.publish(new _messages.JobUpdated(this.job));
    };

    JobDetail.prototype.canDeactivate = function canDeactivate() {
      if (!(0, _utility.areEqual)(this.originalJob, this.job)) {
        var result = confirm('You have unsaved changes. Are you sure you wish to leave?');
        if (!result) {
          this.ea.publish(new _messages.JobViewed(this.job));
        }
        return result;
      }
      return true;
    };

    _createClass(JobDetail, [{
      key: 'canSave',
      get: function get() {
        return this.job.company && this.job.title;
      }
    }]);

    return JobDetail;
  }()) || _class);
});
define('job-list',['exports', 'aurelia-event-aggregator', './web-api', './messages', 'aurelia-framework'], function (exports, _aureliaEventAggregator, _webApi, _messages, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.JobList = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var JobList = exports.JobList = (_dec = (0, _aureliaFramework.inject)(_webApi.WebAPI, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function JobList(api, ea) {
      var _this = this;

      _classCallCheck(this, JobList);

      this.api = api;
      this.jobs = [];
      ea.subscribe(_messages.JobViewed, function (msg) {
        return _this.select(msg.job);
      });
      ea.subscribe(_messages.JobUpdated, function (msg) {
        var id = msg.job.id;
        var found = _this.jobs.find(function (x) {
          return x.id === id;
        });
        Object.assign(found, msg.job);
      });
    }

    JobList.prototype.created = function created() {
      this.jobs = this.api.getJobList();
    };

    JobList.prototype.select = function select(job) {
      this.selectedId = job.id;
      return true;
    };

    return JobList;
  }()) || _class);
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('messages',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var JobUpdated = exports.JobUpdated = function JobUpdated(job) {
    _classCallCheck(this, JobUpdated);

    this.job = job;
  };

  var JobViewed = exports.JobViewed = function JobViewed(job) {
    _classCallCheck(this, JobViewed);

    this.job = job;
  };
});
define('utility',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.areEqual = areEqual;
  function areEqual(obj1, obj2) {
    return Object.keys(obj1).every(function (key) {
      return obj2.hasOwnProperty(key) && obj1[key] === obj2[key];
    });
  }
});
define('web-api',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var id = 0;
  function getId() {
    return ++id;
  }

  var jobs = [{
    id: getId(),
    company: 'PTC',
    title: 'Software Quality Engineer',
    duties: 'Test software and other stuff...',
    startDate: '2016-08',
    endDate: ''
  }, {
    id: getId(),
    company: 'Kepware Technologies',
    title: 'Quality Assurance Engineer',
    duties: 'Software test plan management and development. ' + 'Manual and automated Test Case Management using Team Foundation Server (TFS) and Microsoft Test Manager (MTM). ' + 'Quality control through detailed and accurate software testing, with measured results and engineering feedback processes.',
    startDate: '2014-08',
    endDate: '2016-08'
  }, {
    id: getId(),
    company: 'Rufus Deering Lumber Company',
    title: 'IT Management Intern',
    duties: 'IT Management and stuff...',
    startDate: '2014-01',
    endDate: '2014-08'
  }, {
    id: getId(),
    company: 'Browne Trading Company',
    title: 'Fresh Seafood Product Manager',
    duties: 'Keep fish fresh and stuff...',
    startDate: '2009-08',
    endDate: '2011-11'
  }, {
    id: getId(),
    company: 'Lone Star Construction Company',
    title: 'Carpenter',
    duties: 'Build Everything...',
    startDate: '1996-01',
    endDate: '2008-04'
  }, {
    id: getId(),
    company: 'USAF @ Little Rock AFB',
    title: 'Aircraft Fuels System Specialist',
    duties: 'Fix aeroplanes and stuff...',
    startDate: '2001-11',
    endDate: '2005-04'
  }];

  var WebAPI = exports.WebAPI = function () {
    function WebAPI() {
      _classCallCheck(this, WebAPI);
    }

    WebAPI.prototype.getJobList = function getJobList() {
      return jobs.map(function (x) {
        return {
          id: x.id,
          company: x.company,
          title: x.title,
          duties: x.duties,
          startDate: x.startDate,
          endDate: x.endDate
        };
      });
    };

    WebAPI.prototype.getJobDetails = function getJobDetails(id) {
      return jobs.filter(function (x) {
        return x.id == id;
      })[0];
    };

    WebAPI.prototype.saveJob = function saveJob(job) {
      var instance = JSON.parse(JSON.stringify(job));
      var found = jobs.filter(function (x) {
        return x.id === job.id;
      })[0];
      if (found) {
        var index = jobs.indexOf(found);
        jobs[index] = instance;
      } else {
        instance.id = getId();
        jobs.push(instance);
      }
      return instance;
    };

    return WebAPI;
  }();
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./elements/loading-indicator']);
  }
});
define('resources/elements/loading-indicator',['exports', 'nprogress', 'aurelia-framework'], function (exports, _nprogress, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LoadingIndicator = undefined;

  var nprogress = _interopRequireWildcard(_nprogress);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var LoadingIndicator = exports.LoadingIndicator = (_dec = (0, _aureliaFramework.noView)(['nprogress/nprogress.css']), _dec(_class = (_class2 = function () {
    function LoadingIndicator() {
      _classCallCheck(this, LoadingIndicator);

      _initDefineProp(this, 'loading', _descriptor, this);
    }

    LoadingIndicator.prototype.loadingChanged = function loadingChanged(newValue) {
      if (newValue) {
        nprogress.start();
      } else {
        nprogress.done();
      }
    };

    return LoadingIndicator;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'loading', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  })), _class2)) || _class);
});
define('text!about.html', ['module'], function(module) { module.exports = "<template><div class=\"panel panel-primary\"><div class=\"panel-heading\"><h3 class=\"panel-title\">${aboutMeHeader}</h3></div><div class=\"panel panel-body\"><p id=\"aboutMe\"><img src=\"${aboutMePicture}\" alt=\"Nate Solorzano\" class=\"img-responsive img-rounded\" id=\"aboutMeImg\"> ${aboutMe}</p></div></div></template>"; });
define('text!styles.css', ['module'], function(module) { module.exports = "body { padding-top: 70px; }\n\nsection {\n  margin: 0 50px;\n}\n\na:focus {\n  outline: none;\n}\n\n#aboutMe {\n  text-align: justify;\n}\n\n#aboutMeImg {\n  height: 220px;\n  float: left;\n  margin-bottom: 20px;\n  margin-right: 20px;\n}\n\ntextarea {\n  resize: none;\n}\n\n.navbar-nav li.loader {\n    margin: 12px 24px 0 6px;\n}\n\n.job-list {\n  overflow-y: auto;\n  padding: 20px;\n}\n\n.panel {\n  margin: 20px;\n}\n\n.button-bar {\n  right: 0;\n  left: 0;\n  bottom: 0;\n  border-top: 1px solid #ddd;\n  background: white;\n  margin: 20px;\n}\n\n.button-bar > button {\n  float: right;\n  margin: 20px;\n}\n\nli.list-group-item {\n  list-style: none;\n}\n\nli.list-group-item > a {\n  text-decoration: none;\n}\n\nli.list-group-item.active > a {\n  color: white;\n}\n"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"./styles.css\"></require><require from=\"./job-list\"></require><nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"#\"><span>Nate Solorzano</span></a></div></nav><loading-indicator loading.bind=\"router.isNavigating || api.isRequesting\"></loading-indicator><div class=\"container\"><div class=\"row\"><job-list class=\"col-md-4\"></job-list><router-view class=\"col-md-8\"></router-view></div></div></template>"; });
define('text!job-detail.html', ['module'], function(module) { module.exports = "<template><div class=\"panel panel-primary\"><div class=\"panel-heading\"><h3 class=\"panel-title\">Work History Details</h3></div><div class=\"panel-body\"><form role=\"form\" class=\"form-horizontal\"><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Company</label><div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Company\" class=\"form-control\" value.bind=\"job.company\"></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Title</label><div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Title\" class=\"form-control\" value.bind=\"job.title\"></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Duties</label><div class=\"col-sm-10\"><textarea rows=\"4\" placeholder=\"Duties\" class=\"form-control\" value.bind=\"job.duties\"></textarea></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Start&nbsp;Date</label><div class=\"col-sm-10\"><input type=\"month\" placeholder=\"Start Date\" class=\"form-control\" value.bind=\"job.startDate\"></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">End&nbsp;Date</label><div class=\"col-sm-10\"><input type=\"month\" placeholder=\"End Date\" class=\"form-control\" value.bind=\"job.endDate\"></div></div></form></div></div><div class=\"button-bar\"><button class=\"btn btn-success\" click.delegate=\"save()\" disabled.bind=\"!canSave\">Save</button></div></template>"; });
define('text!job-list.html', ['module'], function(module) { module.exports = "<template><div class=\"job-list\"><ul class=\"list-group\"><li repeat.for=\"job of jobs\" class=\"list-group-item ${job.id === $parent.selectedId ? 'active' : ''}\"><a route-href=\"route: jobs; params.bind: {id:job.id}\" click.delegate=\"$parent.select(job)\"><h4 class=\"list-group-item-heading\">${job.company}</h4><p class=\"list-group-item-text\">${job.title}</p></a></li></ul></div></template>"; });
//# sourceMappingURL=app-bundle.js.map