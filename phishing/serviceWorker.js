const cacheKey="2022-09-16 10:21";
const defaultBuildTimeStamp="2022-09-16 10:21";

var scriptArray=[
	'/RRDMSProject/static/extjs6ml/app/view/GoogleAnalytics/GAInit.js',
	'/RRDMSProject/static/extjs6ml/app/view/GoogleAnalytics/AutoTrack.js',
	'/RRDMSProject/i18n/i18n_en.js?b='+defaultBuildTimeStamp,
	'/RRDMSProject/static/extjs6ml/app/view/util/sha256.js',
	'/RRDMSProject/static/extjs6ml/MetaDataLoader.js?b='+defaultBuildTimeStamp,
	'/RRDMSProject/static/extjs6ml/ext/build/ext-all-6.0.2.js',
	'/RRDMSProject/static/extjs/js/jquery_3.6.0.min.js',
	'/RRDMSProject/static/extjs/js/custom.modernizr_3.11.8.js',
	'/RRDMSProject/i18n/ext-locale/ext-locale-en.js',
	'/RRDMSProject/static/extjs6ml/rrdms-home.js?b='+defaultBuildTimeStamp,
	'/RRDMSProject/static/extjs/js/tiff-min.js',
	'/RRDMSProject/static/extjs/js/charts.js?b='+defaultBuildTimeStamp,
	'/RRDMSProject/static/extjs6ml/app/view/thirdPartylib/TinyMCETextArea/tinymce/tinymce.min.js?b='+defaultBuildTimeStamp,
	'/RRDMSProject/static/extjs6ml/app/view/thirdPartylib/CallAssets/assets/js/SIPml-api.js?b='+defaultBuildTimeStamp,
	'/RRDMSProject/static/extjs6ml/app/view/thirdPartylib/Moment_2.24.0/moment_2.24.0.js?b='+defaultBuildTimeStamp,
	'/RRDMSProject/static/extjs6ml/app/view/thirdPartylib/Moment_2.24.0/moment-timezone-with-data_0.5.23.js?b='+defaultBuildTimeStamp,
	'/RRDMSProject/static/extjs6ml/app/view/thirdPartylib/mousetrap_1.6.5.js?b='+defaultBuildTimeStamp,
	'/RRDMSProject/static/extjs6/ext/build/ext-all-6.0.2.js',	
	'/RRDMSProject/static/extjs6ml/app/view/thirdPartylib/jsoneditor.js'
]

var cssArray=[
	'/RRDMSProject/static/extjs6ml/build/development/theme-triton-6.0.2/resources/theme-triton-all_1.css',
	'/RRDMSProject/static/extjs6ml/build/development/theme-triton-6.0.2/resources/theme-triton-all_2.css',
	'/RRDMSProject/static/extjs6ml/build/development/theme-triton-6.0.2/resources/theme-triton-custom.css',
	'/Analytics/static/ext6.0/ext/theme-crisps/theme-crisp-all-min_1.css',
	'/Analytics/static/ext6.0/ext/theme-crisps/theme-crisp-all-min_2.css',
	'/RRDMSProject/static/css/eippIcons.css',
	'/RRDMSProject/static/css/introjs.min.css',
	'/RRDMSProject/static/css/eippKachingg.css',
	'/RRDMSProject/static/extjs6ml/build/development/theme-triton-6.0.2/resources/theme-triton-all.css',
	'/RRDMSProject/static/css/triton_theme.css?b='+defaultBuildTimeStamp,
	'/Chatbot/static/css/chatBotCss.css?b='+defaultBuildTimeStamp,
	'/Analytics/static/css/analytics.css?b='+defaultBuildTimeStamp,
	'/Crossfunctional-ui/static/css/eciCss.css?b='+defaultBuildTimeStamp,
	'/Crossfunctional-ui/static/css/hiconnectCss.css?b='+defaultBuildTimeStamp,
	'/Analytics/static/css/pivot-all.css?b='+defaultBuildTimeStamp,
	'/Analytics/static/ext6.0/ext/theme-crisps/theme-crisp-all-min.css',
	'/RRDMSProject/static/css/caastyles.css?b='+defaultBuildTimeStamp,
	'/RRDMSProject/static/css/notification.css',
	'/RRDMSProject/static/css/jsoneditor.css'
	
]

var fontArray=[
	'/RRDMSProject/static/extjs6ml/build/development/theme-triton-6.0.2/resources/fonts/OpenSans-Light.ttf',
	'/RRDMSProject/static/extjs6ml/build/development/theme-triton-6.0.2/resources/fonts/OpenSans-Regular.ttf',
	'/RRDMSProject/static/extjs6ml/build/development/theme-triton-6.0.2/resources/fonts/OpenSans-Bold.ttf',
	'/RRDMSProject/static/extjs6ml/build/development/theme-triton-6.0.2/resources/images/loadmask/loading.gif'
]

var imgArray=[
	'/RRDMSProject/static/images/loadanim.gif',
	'/RRDMSProject/static/images/HRLogo_6.png',
	'/RRDMSProject/static/images/triton/Common_Edit-Filter-big.png',
	'/RRDMSProject/static/images/triton/Common_Delete-Filter-big.png',
	'/RRDMSProject/static/images/Loading.gif'
]

self.addEventListener('install', function(event) {
    caches.open(cacheKey).then(function(cache) {
    	var array=scriptArray.concat(cssArray).concat(fontArray).concat(imgArray);
    	for(var key in array){
    		cache.add(array[key]);
    	}
    	
    })
});

self.addEventListener('activate', e => {
	
	  e.waitUntil(
	    caches.keys().then(cacheNames => {
	      return Promise.all(
	        cacheNames.map(cache => {
	          if (cache !== cacheKey) {
	            return caches.delete(cache);
	          }
	        })
	      );
	    })
	  );
	});

self.addEventListener('fetch', function(event) {
	if(event.request.url.includes("/static/")||event.request.url.includes("/i18n/")){
		event.respondWith(
			    caches.match(event.request).then(function(response) {
			      return response || fetch(event.request);
			    })
			  );
	}
	});