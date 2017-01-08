Ext.define('AOC.config.Settings',{
    singleton : true,
    config : {
        baseBackgroundColor : 'background-color:#F6F6F6',
        nameRegex : '^[^@#$%^&*(){}|!<>_+?[/\\\\`~=";:\\]]+$',
        baseUserUrl :applicationContext+'/rest/users',
        baseOrderTrendUrl:applicationContext+'/rest/ordertrend',
        requestTimeOut: 300000,
        tabHeaderTitleStyle:'color:#2f3338;font-size:13px;font-weight:bold;',
        defaultFormLabelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
        defaultBorderStyle:'border:solid 1px #cecece;',
        defaultTbarHeight:50
    },
    form:{
    	defaultLabelAlign:'left'
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
         watch:'avery/resources/images/watch1.png',
         report:'avery/resources/images/report.png',
         error:'avery/resources/images/error.png',
         cancel:'avery/resources/images/cancel.png',
         defaultUserImg:'avery/resources/images/defaultUser.png',
         clip:'avery/resources/images/clip.png',
         EnableUpdateMoqFlag:'avery/resources/images/cart.png',
         DisableUpdateMoqFlag:'avery/resources/images/disable.png',
         success:'avery/resources/images/success.jpg',
         invalid_field:'avery/resources/images/invalid_field.jpg',
         addImage:'avery/resources/images/add.png',
         menuIcon:'avery/resources/images/menuList.png',
         editIcon:'avery/resources/images/edit.png',
         BackIcon:'avery/resources/images/backButton.png',
         commentIcon:'avery/resources/images/comment.png',
         attacheImageSrc:'avery/resources/images/attachmentImage.png',
         deleteImageSrc:'avery/resources/images/delete.png',
         warningImageSrc:'avery/resources/images/warning.png',
         successImageSrc:'avery/resources/images/success.jpg',
         clearSearchIcon:'avery/resources/images/invalid_field.png',
         errorIcon:'avery/resources/images/invalid_field.jpg',
         tickIcon:'avery/resources/images/tick.png',
         valid_field:'avery/resources/images/valid_field.png',
         advSearchIcon:'avery/resources/images/search.png',
         browseIcon:'avery/resources/images/browse.png',
         mailIcon:'avery/resources/images/mail.png'
         
    },
    constructor : function(config){
            this.initConfig(config);
    }
});