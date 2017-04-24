Ext.define('AOC.config.Settings',{
    singleton : true,
    alternateClassName:['Settings'],
    config : {
        baseBackgroundColor : 'background-color:#F6F6F6',
        nameRegex : '^[^@#$%^&*(){}|!<>_+?[/\\\\`~=";:\\]]+$',
        baseUserUrl :applicationContext+'/rest/users',
        baseOrderTrendUrl:applicationContext+'/rest/ordertrend',
        requestTimeOut: 300000,
        tabHeaderTitleStyle:'color:#2f3338;font-size:13px;font-weight:bold;',
        defaultFormLabelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;',
        defaultFieldSetLabelStyle:'color:#2c3e50;font-size:13px;font-weight:normal;',
        defaultBorderStyle:'border:solid 1px #cecece;',
        defaultTbarHeight:50,
        header:{
        	headerBgStyle:'box-shadow: 0px 0px 1px 0px rgba(47, 51, 56, 0.07), inset 0px -1px 0px 0px #C7C8C9;'
        },
        defaultIcons:{
        	commentColumnIcon:'<i class="fa fa-comment-o" style="font-size:16px;"></i>',
        	errorColumnIcon:'<i class="fa fa fa-exclamation-circle" style="font-size:16px;color:#ff0000;"></i>',
        	actionIcon:'fa fa-ellipsis-v'	
        }
    },
    
    form:{
    	defaultLabelAlign:'left',
    	topLabelAlign:'top',
    	 wiLabelStyle:'font-weight:bold;color:#2c3e50;font-size:15px;'
    },
    buttonsCls:{
    	 tick:'fa fa-check',
         warning:'fa fa-exclamation-triangle',
         watch:'fa fa-clock-o',
         error:'fa fa-exclamation-circle',
         cancel:'fa fa-ban',
         cross:'fa fa-times'
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
         watch:'avery/resources/images/watch.png',
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
         deleteImageSrc:'avery/resources/images/trash.png',
         warningImageSrc:'avery/resources/images/warning.png',
         successImageSrc:'avery/resources/images/success.jpg',
         clearSearchIcon:'avery/resources/images/invalid_field.png',
         errorIcon:'avery/resources/images/invalid_field.jpg',
         tickIcon:'avery/resources/images/tick.png',
         valid_field:'avery/resources/images/valid_field.png',
         advSearchIcon:'avery/resources/images/search.png',
         browseIcon:'avery/resources/images/browse.png',
         mailIcon:'avery/resources/images/mail.png',
         mail:'avery/resources/images/mail.png',
         cross:'avery/resources/images/bullet_cross.png'
    },
    constructor : function(config){
            this.initConfig(config);
    }
});