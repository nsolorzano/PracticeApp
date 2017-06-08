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
    this.aboutMe = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,';
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
      this.job = job;
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
        return this.job.company && this.job.title && !this.api.isRequesting;
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
define('skillz',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Skillz = exports.Skillz = function Skillz() {
    _classCallCheck(this, Skillz);
  };
});
define('timesheet',[], function () {
  'use strict';

  (function () {
    'use strict';

    var Timesheet = function Timesheet(container, min, max, data) {
      this.data = [];
      this.year = {
        min: min,
        max: max
      };

      this.parse(data || []);

      if (typeof document !== 'undefined') {
        this.container = typeof container === 'string' ? document.querySelector('#' + container) : container;
        this.drawSections();
        this.insertData();
      }
    };

    Timesheet.prototype.insertData = function () {
      var html = [];
      var widthMonth = this.container.querySelector('.scale section').offsetWidth;

      var n = 0;
      var m = this.data.length;
      for (; n < m; n++) {
        var cur = this.data[n];
        var bubble = this.createBubble(widthMonth, this.year.min, cur.start, cur.end);

        var line = ['<span style="margin-left: ' + bubble.getStartOffset() + 'px; width: ' + bubble.getWidth() + 'px;" class="bubble bubble-' + (cur.type || 'default') + '" data-duration="' + (cur.end ? Math.round((cur.end - cur.start) / 1000 / 60 / 60 / 24 / 39) : '') + '"></span>', '<span class="date">' + bubble.getDateLabel() + '</span> ', '<span class="label">' + cur.label + '</span>'].join('');

        html.push('<li>' + line + '</li>');
      }

      this.container.innerHTML += '<ul class="data">' + html.join('') + '</ul>';
    };

    Timesheet.prototype.drawSections = function () {
      var html = [];

      for (var c = this.year.min; c <= this.year.max; c++) {
        html.push('<section>' + c + '</section>');
      }

      this.container.className = 'timesheet color-scheme-default';
      this.container.innerHTML = '<div class="scale">' + html.join('') + '</div>';
    };

    Timesheet.prototype.parseDate = function (date) {
      if (date.indexOf('/') === -1) {
        date = new Date(parseInt(date, 10), 0, 1);
        date.hasMonth = false;
      } else {
        date = date.split('/');
        date = new Date(parseInt(date[1], 10), parseInt(date[0], 10) - 1, 1);
        date.hasMonth = true;
      }

      return date;
    };

    Timesheet.prototype.parse = function (data) {
      var n = 0;
      var m = data.length;
      for (; n < m; n++) {
        var beg = this.parseDate(data[n][0]);
        var end = data[n].length === 4 ? this.parseDate(data[n][1]) : null;
        var lbl = data[n].length === 4 ? data[n][2] : data[n][1];
        var cat = data[n].length === 4 ? data[n][3] : data[n].length === 3 ? data[n][2] : 'default';

        if (beg.getFullYear() < this.year.min) {
          this.year.min = beg.getFullYear();
        }

        if (end && end.getFullYear() > this.year.max) {
          this.year.max = end.getFullYear();
        } else if (beg.getFullYear() > this.year.max) {
          this.year.max = beg.getFullYear();
        }

        this.data.push({ start: beg, end: end, label: lbl, type: cat });
      }
    };

    Timesheet.prototype.createBubble = function (wMonth, min, start, end) {
      return new Bubble(wMonth, min, start, end);
    };

    var Bubble = function Bubble(wMonth, min, start, end) {
      this.min = min;
      this.start = start;
      this.end = end;
      this.widthMonth = wMonth;
    };

    Bubble.prototype.formatMonth = function (num) {
      num = parseInt(num, 10);
      return num >= 10 ? num : '0' + num;
    };

    Bubble.prototype.getStartOffset = function () {
      return this.widthMonth / 12 * (12 * (this.start.getFullYear() - this.min) + this.start.getMonth());
    };

    Bubble.prototype.getFullYears = function () {
      return (this.end && this.end.getFullYear() || this.start.getFullYear()) - this.start.getFullYear();
    };

    Bubble.prototype.getMonths = function () {
      var fullYears = this.getFullYears();
      var months = 0;

      if (!this.end) {
        months += !this.start.hasMonth ? 12 : 1;
      } else {
        if (!this.end.hasMonth) {
          months += 12 - (this.start.hasMonth ? this.start.getMonth() : 0);
          months += 12 * (fullYears - 1 > 0 ? fullYears - 1 : 0);
        } else {
          months += this.end.getMonth() + 1;
          months += 12 - (this.start.hasMonth ? this.start.getMonth() : 0);
          months += 12 * (fullYears - 1);
        }
      }

      return months;
    };

    Bubble.prototype.getWidth = function () {
      return this.widthMonth / 12 * this.getMonths();
    };

    Bubble.prototype.getDateLabel = function () {
      return [(this.start.hasMonth ? this.formatMonth(this.start.getMonth() + 1) + '/' : '') + this.start.getFullYear(), this.end ? '-' + ((this.end.hasMonth ? this.formatMonth(this.end.getMonth() + 1) + '/' : '') + this.end.getFullYear()) : ''].join('');
    };

    window.Timesheet = Timesheet;
  })();
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
    company: 'Kepware Technologies',
    title: 'Software Quality Engineer',
    duties: 'Dutie1',
    startDate: '2016-08',
    endDate: '2080-08'
  }, {
    id: getId(),
    company: 'Kepware Technologies',
    title: 'Quality Assurance Engineer',
    duties: 'Software test plan management and development. Manual and automated Test Case Management using Team Foundation Server (TFS) and Microsoft Test Manager (MTM). Quality control through detailed and accurate software testing, with measured results and engineering feedback processes.',
    startDate: '2014-08',
    endDate: '2016-08'
  }, {
    id: getId(),
    company: 'Job3',
    title: 'Title3',
    duties: 'Dutie3',
    startDate: '2014-02',
    endDate: '2014-02'
  }, {
    id: getId(),
    company: 'Job4',
    title: 'Title4',
    duties: 'Dutie4',
    startDate: '2014-02',
    endDate: '2014-02'
  }, {
    id: getId(),
    company: 'Job5',
    title: 'Title5',
    duties: 'Dutie5',
    startDate: '2014-02',
    endDate: '2014-02'
  }];

  var WebAPI = exports.WebAPI = function () {
    function WebAPI() {
      _classCallCheck(this, WebAPI);

      this.isRequesting = false;
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
define('text!about.html', ['module'], function(module) { module.exports = "<template><div class=\"panel panel-primary\"><div class=\"panel-heading\"><h3 class=\"panel-title\">${aboutMeHeader}</h3></div><div class=\"panel panel-body\">${aboutMe}</div></div></template>"; });
define('text!styles.css', ['module'], function(module) { module.exports = "body { padding-top: 70px; }\n\nsection {\n  margin: 0 50px;\n}\n\na:focus {\n  outline: none;\n}\n\n.navbar-nav li.loader {\n    margin: 12px 24px 0 6px;\n}\n\n.job-list {\n  overflow-y: auto;\n  padding: 20px;\n}\n\n.panel {\n  margin: 20px;\n}\n\n.button-bar {\n  right: 0;\n  left: 0;\n  bottom: 0;\n  border-top: 1px solid #ddd;\n  background: white;\n  margin: 20px;\n}\n\n.button-bar > button {\n  float: right;\n  margin: 20px;\n}\n\nli.list-group-item {\n  list-style: none;\n}\n\nli.list-group-item > a {\n  text-decoration: none;\n}\n\nli.list-group-item.active > a {\n  color: white;\n}\n"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"./styles.css\"></require><require from=\"./job-list\"></require><nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"#\"><span>Nate Solorzano</span></a></div></nav><loading-indicator loading.bind=\"router.isNavigating || api.isRequesting\"></loading-indicator><div class=\"container\"><div class=\"row\"><job-list class=\"col-md-4\"></job-list><router-view class=\"col-md-8\"></router-view></div></div></template>"; });
define('text!job-detail.html', ['module'], function(module) { module.exports = "<template><div class=\"panel panel-primary\"><div class=\"panel-heading\"><h3 class=\"panel-title\">Work History Details</h3></div><div class=\"panel-body\"><form role=\"form\" class=\"form-horizontal\"><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Company</label><div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Company\" class=\"form-control\" value.bind=\"job.company\"></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Title</label><div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Title\" class=\"form-control\" value.bind=\"job.title\"></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Duties</label><div class=\"col-sm-10\"><input type=\"text\" placeholder=\"Duties\" class=\"form-control\" value.bind=\"job.duties\"></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Start&nbsp;Date</label><div class=\"col-sm-10\"><input type=\"month\" placeholder=\"Start Date\" class=\"form-control\" value.bind=\"job.startDate\"></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">End&nbsp;Date</label><div class=\"col-sm-10\"><input type=\"month\" placeholder=\"End Date\" class=\"form-control\" value.bind=\"job.endDate\"></div></div></form></div></div><div class=\"button-bar\"><button class=\"btn btn-success\" click.delegate=\"save()\" disabled.bind=\"!canSave\">Save</button></div></template>"; });
define('text!job-list.html', ['module'], function(module) { module.exports = "<template><div class=\"job-list\"><ul class=\"list-group\"><li repeat.for=\"job of jobs\" class=\"list-group-item ${job.id === $parent.selectedId ? 'active' : ''}\"><a route-href=\"route: jobs; params.bind: {id:job.id}\" click.delegate=\"$parent.select(job)\"><h4 class=\"list-group-item-heading\">${job.company}</h4><p class=\"list-group-item-text\">${job.title}</p></a></li></ul></div></template>"; });
define('text!skillz.html', ['module'], function(module) { module.exports = "<template><p>Skillz Page - Place Holder</p></template>"; });
//# sourceMappingURL=app-bundle.js.map