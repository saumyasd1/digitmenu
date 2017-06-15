Ext.define('AOC.view.taskmanager.AssignCSRWindow',{
	extend:'AOC.view.base.NewBaseWindow',
	xtype:'assigncsrwindow',
	width:350,
	controller:'assigncsrwindow',
	title:'Assign CSR',
	requires:[
        'AOC.store.AssignCSRStore',
        'AOC.view.taskmanager.AssignCSRController'
    ],
    layout:'form',
    defaults:{
		labelWidth:100,
		labelSeparator:'',
		width:300,
		labelStyle:Settings.config.defaultFormLabelStyle
	},
	initComponent:function(){
		this.items = this.buildItems();
		this.buttons = this.buildButtons();
		this.callParent(arguments);
	},
	buildItems:function(){
		return [
			{
				xtype:'combo',
				displayField:'csrName',
				fieldLabel:'CSR',
				reference:'csrCombo',
				name:'CSR',
				valueField:'id',
				queryMode:'local',
				store:Ext.create('AOC.store.AssignCSRStore'),
				typeAhead:true,
				listeners:{
					'afterrender':'onAfterRenderCSRList'
				}
			}
		];
	},
	buildButtons:function(){
		return [
	        '->',
			{
				//xtype:'whitebutton',
				text:'Assign',
				handler:'onSaveBtnClicked'
			}
		];
	}
});