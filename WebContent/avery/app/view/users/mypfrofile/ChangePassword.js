 Ext.define('AOC.view.users.myprofile.ChangePassword', {
     extend: 'Ext.form.Panel',
     alias: 'widget.changepassword',
     initComponent: function () {
    	 var runtime=AOC.config.Runtime;
         Ext.apply(Ext.form.VTypes, {
        	 newpassword: function(val,field) {
        		    if(val && val.length<8)
        		    	{
        		    	field.vtypeText =minimum8Char;
        		    	return false;
        		    	}
        		    if (field.initialPassField) {
              		 var pwd = Ext.ComponentQuery.query('#'+field.initialPassField)[0];
              		  if(val && val == pwd.getValue()){
              		  field.vtypeText =newPasswordFailureMsg;
              		    	return false;
              		   }}
              		 return true;
        		    },
        		    password : function(val, field) {
        		    if (field.initialPassField) {
        		     var pwd = Ext.ComponentQuery.query('#'+field.initialPassField)[0];
        		    	return (val == pwd.getValue());
        		    }
        		        return true;
        		    },
        		    passwordText :passwordsNotMatch
         });
         Ext.apply(this, {
             items: this.buildItems()
         });
         this.callParent(arguments);
     },
     buildItems: function () {
         var me = this;
         return [{
             xtype: 'form',
             itemId: 'changepasswordform',
             cls: 'left-right-container-border',
             layout: {
                 type: 'vbox'
             },
             bodyPadding:'100 100 100 220',
             height: 350,
             items: [{
                 xtype: 'textfield',
                 inputType: 'password',
                 itemId: 'currentPassword',
                 name: 'currentPassword',
                 labelSeparator: ' ',
                 fieldLabel:currentPassword,
                 margin:'0 0 25 0',
                 width: 700,
                 scope: me,
                 allowBlank: false,
                 validateOnChange:false,
                 labelWidth: 200,
                 validator:me.checkCurrentPassword
             }, {
        	 xtype: 'textfield',
                 inputType: 'password',
                 itemId: 'newPassword',
                 name: 'password',
                 labelSeparator: ' ',
                 margin:'0 0 25 0',
                 fieldLabel: newPassword,
                 width: 700,
                 labelWidth: 200,
                 allowBlank: false,
                 validateOnChange:false,
                 vtype:'newpassword',
                 initialPassField: 'currentPassword',
                 listeners: {
                     blur : me.hideInfoWindow,
                     change: me.showPasswordInfo,
                     scope: me
                 }
             },{
        	 xtype: 'textfield',
                 inputType: 'password',
                 itemId: 'confirmPassword',
                 name: 'confirmPassword',
                 labelSeparator: ' ',
                 allowBlank: false,
                 margin:'0 0 25 0',
                 fieldLabel: confirmPassword,
                 width: 700,
                 vtype: 'password',
                 initialPassField: 'newPassword',
                 labelWidth: 200
             }]
         }];
     },
     showPasswordInfo: function (cmp, newValue) {
         var me = this;
         me.fireEvent('showinfotip', cmp, newValue);
     },
     hideInfoWindow : function(){
         var me = this;
         //AOC.getApplication().fireEvent('hideinfotip');
     },
     checkCurrentPassword: function (value) {
    if(!Ext.isEmpty(value)){ 
     	// #AC-3564: Handling of special characters in in password during password change operation
     var user = AOC.config.Runtime.getUser(),
     url = applicationContext+'/rest/users/checkcurrentpassword/' + user.id + '?password=' + encodeURIComponent(value),
     data = AOC.util.Helper.sendAjaxRequest(url, 'GET', false);
     if(data.passwordmatch)
	 return true;
     else
    	 return incorrectPasswordMsg;
     }
    	return true;
     }
 });