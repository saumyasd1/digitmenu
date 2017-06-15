Ext.define('AOC.view.users.myprofile.ChangePasswordWin', {
    extend: 'AOC.view.base.NewBaseWindow',
    requires : [
        'AOC.view.users.myprofile.ChangePassword'
    ],
    width:600,
    bodyPadding:10,
    title:'Change Password',
    controller:'changepasswordwincontroller',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    buttons:[
         {
		    reference:'cancelBtn',
		    text:'Cancel',
		    handler:'onClickCancel'
		},{
		    text:'Save',
		    reference:'saveBtn',
		    handler:'onClickSaveBtn'
		}
    ],
    items:[
       {
    	   xtype: 'changepassword',
    	   reference:'changePasswordPanel'
       }
    ]
});