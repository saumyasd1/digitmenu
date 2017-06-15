Ext.define('AOC.view.widget.PasswordStrengthMeter', {
extend        : 'Ext.container.Container',
alias : 'widget.passwordstrengthmeter',
layout    : {
    type  : 'vbox',
    align : 'stretch'
},
initComponent : function(){
    var me = this;
    Ext.apply(me,{
        items : me.buildItems()
    });
    me.callParent(arguments);
},
buildItems : function(){
    var me = this;
    
    return [
         {
        	 xtype: 'component',
             height: 9,
             cls  : 'password-strength-meter-win-top',
             html: '<div  class="password-strength-meter-win-top-arrow"><div  class="password-strength-meter-win-top-arrow-overlay"></div></div>'
         },
        	
        {
        	xtype:'container',
        	cls :'password-strength-meter-win-container',
        	flex:1,
        	layout    : {
        	    type  : 'vbox',
        	    align : 'stretch'
        	},
        items:[
        {
        xtype          : 'dataview',
        flex           : 1,
        loadMask :false,
        store          : 'PasswordStrengthMeter',
        deferEmptyText : false,
        style:{"padding-top":"10px;",
        		"padding-left":"10px;",
        		"padding-right":"10px;"},
        tpl            : me.buildTpl(),
        itemSelector    : 'div.password-strength-meter-win-item'
    },{
    	xtype:'tbtext',
    	text:'<div style="margin-top:7px;color:#9b9b9b">'+ConnectLit.passwordStrength+'</div>',
    	cls:'password-strength-meter-percent-item',
    	height:30
      },{
    	xtype:'tbtext',
    	text:'0%',
    	itemId:'percentageText',
    	style:{"text-align":"center","color":"#9b9b9b","font-weight":"600"},
    	height:10
      },
      {
      xtype:'component',
      height:30,
      style:{"padding":"10px;","padding-top":"5px;"},
      html:'<div  id="mainpasswordmeter" data-qtip="' +ConnectLit.passwordStrength +'" class="x-form-strengthmeter" >'+
      '<div   class="x-form-strengthmeter-scorebar">&nbsp'+
      '</div></div>'
      }]}
    ];
},
buildTpl : function(){
	return Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '<div class="password-strength-meter-win-item">',
                    '<div style="{iconCls}" class="password-strength-meter-win-item-icon {icon}"></div>',
                    '<div class="password-strength-meter-win-item-text"><span>{text}</span></div>',
                '</div>',
            '</tpl>'
        );
},
updateMeter : function(val) {
	 var me = this, maxWidth, score, scoreWidth,
     objMeter = me.el.down('.x-form-strengthmeter'),
     scoreBar = me.el.down('.x-form-strengthmeter-scorebar'),
     mainpasswordmeter=document.getElementById('mainpasswordmeter'),
     percentageText=Ext.ComponentQuery.query('#percentageText')[0];
	// element=document.getElementById('passwordstrength');
 if (val){
     maxWidth = objMeter.getWidth();
     score = me.calcStrength(val);
     scoreWidth = maxWidth - (maxWidth / 100) * score;
    if(score && score!==0){
   // element.style.width="80px";
    Ext.Function.defer(function(){
    if(score<=30){
    	mainpasswordmeter.style.backgroundColor="#fc657c";
    	percentageText.setText("25%");
    	//element.innerHTML=ConnectLit.weak;
    }
    else if(score>30 && score<=54){
    	mainpasswordmeter.style.backgroundColor="#f4ce5f";
    	percentageText.setText("50%");
    	//element.innerHTML=ConnectLit.medium;
    }
    else if(score>54 && score<=74){
    	mainpasswordmeter.style.backgroundColor="#69c6fa";
    	percentageText.setText("75%");
    	//element.innerHTML=ConnectLit.strong;
    }
    else if(score>74){
    	mainpasswordmeter.style.backgroundColor="#75ce5f";
    	percentageText.setText("100%");
    	//scoreBar.setWidth('0%');
    }   
    },200);
    }
     else{
     scoreBar.setWidth('100%');
     percentageText.setText("0%");
     }
    if(score>=30)
    scoreBar.setWidth(scoreWidth, true);
 } else {
     scoreBar.setWidth('100%');
     percentageText.setText("0%");
     me.calcStrength(val);
 }
},
calcStrength: function(p) {
    // PASSWORD LENGTH
	var me=this,
    len = p.length,
    len =(len)?len:0,
    store=Ext.getStore('PasswordStrengthMeter'),
    min8CharRec=store.getAt(store.find('text',ConnectLit.minimum8Char)),
    upperCaseRec=store.getAt(store.find('text',ConnectLit.oneUpperCase)),
    lowerCaseRec=store.getAt(store.find('text',ConnectLit.oneLowerCase)),
    specialCharRec=store.getAt(store.find('text',ConnectLit.specialChar)),
    numericalsRec=store.getAt(store.find('text',ConnectLit.numericals)),
    score = 0;
    if (len >=8) {
        score = 15;
        me.ShowCheckedIcon(min8CharRec);
    }else{
    	me.showAlertIcon(min8CharRec);
    }
    if (p.match(/[a-z]/)) {
        score = 15;
        me.ShowCheckedIcon(lowerCaseRec);
    }else{
    	me.showAlertIcon(lowerCaseRec);
    }
    if (p.match(/[A-Z]/)) { 
        score = 15;
        me.ShowCheckedIcon(upperCaseRec);
    }else{
    	me.showAlertIcon(upperCaseRec);
    }
    if (p.match(/\d/)) { 
        score = 15;
        me.ShowCheckedIcon(numericalsRec);
    }else{
    	me.showAlertIcon(numericalsRec);
    }
    if (p.match(/[\!,@,#,$,%,\^,&,\*,\?,_,~]/)) {
        score =15;
        me.ShowCheckedIcon(specialCharRec);
    }else{
    	me.showAlertIcon(specialCharRec);
    }
    if (p.match(/(?=.*[a-z])(?=.*[A-Z])/)) {
        score = 27;
    }
    if (p.match(/(?=.*\d)(?=.*[a-z])/)) {
        score = 27;
    }
    if (p.match(/(?=.*\d)(?=.*[\!,@,#,$,%,\^,&,\*,\?,_,~])/)) {
        score = 27;
    }
    if (p.match(/(?=.*\d)(?=.*[A-Z])/)) {
        score = 27;
    }
    if (p.match(/(?=.*[A-Z])(?=.*[\!,@,#,$,%,\^,&,\*,\?,_,~])/)) {
        score = 27;
    }
    if (p.match(/(?=.*[a-z])(?=.*[\!,@,#,$,%,\^,&,\*,\?,_,~])/)) {
        score = 27;
    }
    if (p.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)) {
        score = 37;
    }
    if (p.match(/(?=.*\d)(?=.*[a-z])(?=.*[\!,@,#,$,%,\^,&,\*,\?,_,~])/)) {
        score = 37;
    }
    if (p.match(/(?=.*\d)(?=.*[A-Z])(?=.*[\!,@,#,$,%,\^,&,\*,\?,_,~])/)) {
        score = 37;
    }
    if (p.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[\!,@,#,$,%,\^,&,\*,\?,_,~])/)) {
        score = 37;
    }
    if (p.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\!,@,#,$,%,\^,&,\*,\?,_,~])/)) {
        score = 50;
    }
    if (len<8) { 
        me.showAlertIcon(min8CharRec);
        return 0;  
        }
    return Math.min(Math.round(score * 2), 100);
},
ShowCheckedIcon:function(rec){
	rec.set('icon','vvicon-checkmark-circle');
	rec.set('iconCls','color:#75ce5f;font-size:12pt;position:absolute;left:5px;');
	rec.commit();
},
showAlertIcon:function(rec){
	rec.set('icon','ai-alert');
	rec.set('iconCls','color:#fc657c;font-size:30pt;');
	rec.commit();
	
}
});