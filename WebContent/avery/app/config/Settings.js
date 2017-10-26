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
    wiConfig:{
    	textAreaMaxLength:1000,
    	maxLength50:50,
    	maxLength100:100,
    	maxLength2000:2000,
    	maxLength250:250,
    	maxLength200:200,
    	counterLabelStyle:'padding-right:5px;text-align:right;font-style:italic;color:#808080;font-weight:bold;'
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
         logoImage:'resources/images/logo_avery.gif',
         report:'avery/resources/images/report.png',
         EnableUpdateMoqFlag:'avery/resources/images/cart.png',
         DisableUpdateMoqFlag:'avery/resources/images/disable.png',
         invalid_field:'avery/resources/images/invalid_field.jpg',
         menuIcon:'resources/images/menuList.png',
         editIcon:'avery/resources/images/edit.png'
    },
    constructor : function(config){
            this.initConfig(config);
    }
});