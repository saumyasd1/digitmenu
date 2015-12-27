Ext.define('AOC.config.Settings',{
    singleton : true,
    config : {
        baseBackgroundColor : 'background-color:#F6F6F6'
    },
    buttonIcons : {
         logoImage:'avery/resources/images/logo_avery.gif',
         logout:'avery/resources/images/logout.png',
         settings:'avery/resources/images/settings.png',
         notification:'avery/resources/images/notification.png',
         arrowDown:'avery/resources/images/arrow-down.png',
         backIcon:'avery/resources/images/arrow-lef.svg',
         tick:'avery/resources/images/tick.svg',
         warning:'avery/resources/images/warning.svg',
         error:'avery/resources/images/error.png',
         cancel:'avery/resources/images/cancel.png'
    },
    constructor : function(config){
            this.initConfig(config);
    }
});