 Ext.define('AOC.view.users.myprofile.ChangePassword', {
     extend: 'Ext.form.Panel',
     alias: 'widget.changepassword',
     initComponent: function () {
         Ext.apply(Ext.form.VTypes, {
        	 newpassword: function(val,field) {
    		    if(val && val.length<8){
    		    	field.vtypeText =minimum8Char;
    		    	return false;
	    		}
    		    if (field.initialPassField) {
    		    	var form=field.up('form');
    		    	var pwd = form.down('#'+field.initialPassField);
          		  	if(val && val == pwd.getValue()){
          		  		field.vtypeText =AOCLit.newPasswordFailureMsg;
          		  		return false;
          		  	}
      		  	}
    		    return true;
		    },
		    password : function(val, field) {
    		    if(field.initialPassField) {
	    			var form=field.up('form');
	    			var pwd = form.down('#'+field.initialPassField);
    		    	return (val == pwd.getValue());
    		    }
		        return true;
		    },
		    passwordText :AOCLit.passwordsNotMatch
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
             layout: {
                 type: 'vbox',
                 align:'stretch'
             },
             items: [{
                 xtype: 'textfield',
                 inputType: 'password',
                 itemId: 'currentPassword',
                 name: 'currentPassword',
                 labelSeparator: ' ',
                 labelStyle: Settings.config.defaultFormLabelStyle,
                 labelAlign: Settings.form.defaultLabelAlign,
                 fieldLabel:AOCLit.currentPassword,
                 margin:'0 0 5 0',
                 flex:1,
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
                 labelStyle: Settings.config.defaultFormLabelStyle,
                 labelAlign: Settings.form.defaultLabelAlign,
                 labelSeparator: ' ',
                 margin:'0 0 5 0',
                 fieldLabel: AOCLit.newPassword,
                 anchor: '60%',
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
                 labelStyle: Settings.config.defaultFormLabelStyle,
                 labelAlign: Settings.form.defaultLabelAlign,
                 labelSeparator: ' ',
                 allowBlank: false,
                 margin:'0 0 5 0',
                 fieldLabel: AOCLit.confirmPassword,
                 anchor: '60%',
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
			var user = AOCRuntime.getUser(),
	 			url = applicationContext+'/rest/users/checkcurrentpassword/' + user.id + '?password=' + encodeURIComponent(value),
	 			data = AOC.util.Helper.sendAjaxRequest(url, 'GET', false);
			if(data.passwordmatch){
		    	 return true;
			}
			else{
		    	 return AOCLit.incorrectPasswordMsg;
			}
 		}
    	return true;
     }
 });