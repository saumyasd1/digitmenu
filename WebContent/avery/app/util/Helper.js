Ext.define('AOC.util.Helper',{
    singleton : true,
    config : {
        mainContainerTip : null
    },
  getSwitchButtonHtml: function(event, status, cssClass){
	  var switchBorder='',
	  circlePadding;
	  if('on' == status){
		  circlePadding = '16px';
	  }else{
		  switchBorder = 'style="border:1px solid #bcbcbc;"';
		  circlePadding = '0px';
	  }
   var leftStyle = !Ext.isEmpty(cssClass)?'style="top:1px;"':'';
   cssClass = Ext.isEmpty(cssClass)?'':cssClass;
   var html = '<span class="text-style-switch'+cssClass+'">';
   //#AC-3110 Change the literal for off text.
    html +='<span class="onoff-text'+cssClass+'"><b>'+'InActive'+'</b></span>';
    html +='<div '+leftStyle+' event="'+event+'" class="onoffswitch">';
	html +='<label event="'+event+'"'+switchBorder+'  class="onoffswitch-label">';
	html +='<span event="'+event+'" class="onoffswitch-inner-'+status+'"></span>';
	html +='<span event="'+event+'" style="left:'+circlePadding+';" class="onoffswitch-switch"></span>';
	html +='</label>';
	html+='</div>';
	html +='<span class="on-text'+cssClass+'">'+'<b>Active'+'</b></span>';
    html+='</span>';
   return html;
  }
});
