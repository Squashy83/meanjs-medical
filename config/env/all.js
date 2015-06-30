'use strict';

module.exports = {
	app: {
		title: 'HEALTHNET',
		description: 'Medical, Social, Mind Health',
		keywords: 'Medical, Social, Mind, Health'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
							'public/lib/bootstrap/dist/css/bootstrap.css',
							'public/lib/bootstrap/dist/css/bootstrap-theme.css',
						//from here template specific css
							'public/lib/bootstrap/dist/css/bootstrap.min.css',
                            'public/lib/bootstrap/dist/css/carousel.css',
							'public/lib/metisMenu/dist/metisMenu.min.css',
							'public/lib/startbootstrap-sb-admin-2/dist/css/timeline.css',
							'public/lib/startbootstrap-sb-admin-2/dist/css/sb-admin-2.css',
							'public/lib/morrisjs/morris.css',
							'public/lib/font-awesome/css/font-awesome.min.css',
                            'public/lib/nvd3/nv.d3.css',
                            'public/lib/ngDialog/css/ngDialog.css',
                            'public/lib/ngDialog/css/ngDialog-theme-default.css'
                

						],
						js: [
							'public/lib/angular/angular.js',
							'public/lib/angular-resource/angular-resource.js',
							'public/lib/angular-cookies/angular-cookies.js',
							'public/lib/angular-animate/angular-animate.js',
							'public/lib/angular-touch/angular-touch.js',
							'public/lib/angular-sanitize/angular-sanitize.js',
							'public/lib/angular-ui-router/release/angular-ui-router.js',
							'public/lib/angular-ui-utils/ui-utils.js',
							'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                            'public/lib/angular-smart-table/dist/smart-table.min.js',
                            //from here template specific js
'public/lib/jquery/dist/jquery.min.js',  
'public/lib/bootstrap/dist/js/bootstrap.min.js',
'public/lib/metisMenu/dist/metisMenu.min.js', 
'public/lib/raphael/raphael-min.js',
'public/lib/morrisjs/morris.min.js', 
'public/lib/startbootstrap-sb-admin-2/dist/js/sb-admin-2.js',
'public/lib/d3/d3.js',
'public/lib/nvd3/nv.d3.js',
'public/lib/angular-nvd3/dist/angular-nvd3.js',
'public/lib/ngDialog/js/ngDialog.js',
'public/lib/angular-utils-pagination/dirPagination.js'
                            
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};