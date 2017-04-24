Ext.define('AOC.view.users.roles.EditPermissionWindow', {
    extend: 'AOC.view.base.NewBaseWindow',
    alias: 'widget.editpermissionwindow',
    itemId: 'editPermissionWindow',
    reference: 'editPermissionWindow',
    layout: 'fit',
    width: 600,
    height: 180,
    title: 'Edit Permission',
    initComponent: function () {
        var me = this;
        me.items = me.buildItems(),
            me.buttons = me.buildButtons(),
            me.callParent(arguments);
    },
    afterRender:function(){
		var me = this;
		me.callParent(arguments);
		this.mask(AOCLit.pleaseWaitTitle);
		var	grid = me.down('checkboxgroup'),
			store = new Ext.data.JsonStore({
				fields:['id'],
				proxy : {
					type : 'rest',
					url : applicationContext+'/rest/role/editpermission/'+ me.recordId,
					reader:{
						type:'json', 
						rootProperty: 'ArrayList'
					}
				},
				autoLoad:true
			});
		
		grid.bindStore(store);
		this.unmask();
	},
    buildItems: function () {
        return [{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '5 10 5 5',
                defaults: {
                    labelSeparator: '',
                    labelStyle: Settings.config.defaultFieldSetLabelStyle,
                    labelAlign: Settings.form.defaultLabelAlign,
                },
                items: [{
                    xtype: 'checkboxgroup',
                    columns: 4,
                    reference: 'menuCheckbox',
                    items: [{
                        boxLabel: 'Home Screen',
                        width: 150,
                        name: 'Home',
                        inputValue: '1'
                    }, {
                        boxLabel: 'Task Manager',
                        width: 150,
                        name: 'TaskManager',
                        inputValue: '2'
                    }, {
                        boxLabel: 'Email Queue',
                        width: 150,
                        name: 'EmailQueue',
                        inputValue: '3'
                    }, {
                        boxLabel: 'Order Queue',
                        width: 150,
                        name: 'OrderQueue',
                        inputValue: '4'
                    }, {
                        boxLabel: 'Web Order',
                        width: 150,
                        name: 'WebOrder',
                        inputValue: '5'
                    }, {
                        boxLabel: 'Partner',
                        width: 150,
                        name: 'Partner',
                        inputValue: '6'
                    }, {
                        boxLabel: 'Address',
                        width: 150,
                        name: 'Address',
                        inputValue: '7'
                    }]
                }]
            }

        ];
    },
    buildButtons: function () {
        return [
            '->', {
                text: 'Save',
                handler: 'onSaveBtnClick'
            }
        ];
    }
});
