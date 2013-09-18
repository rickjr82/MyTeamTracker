require.config({
    paths: {
        angular: '/Scripts/angular',
        underscore: '/Scripts/underscore.min',
        toastr: '/Scripts/toastr.min',
        breeze: '/Scripts/breeze.min',
        uibootstrap: '/Scripts/ui-bootstrap-tpls-0.6.0.min',
        smarttable: 'lib/Smart-Table.min'    
    },
    baseUrl: '/app/js',
    shim: {
        'angular': { exports: 'angular'},
        'underscore': { exports: '_' },
        'uibootstrap': { deps: ['angular'] },
        'smarttable': { deps: ['angular'] },
        'breeze': { exports: 'breeze' },        
    }
});

require(['angular', 'app', 'toastr', 'breeze', 'controllers/controllers', 'services/services', 'underscore', 'uibootstrap', 'smarttable', 'controllers/adminController'], function (angular, app, toastr, breeze) {
    'use strict';
    app.value('toastr', toastr);
    app.value('breeze', breeze);
    var $html = angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(function () {
        $html.addClass('ng-app');
        angular.bootstrap($html, [app['name'], 'ui.bootstrap','smartTable.table']);
    });
});