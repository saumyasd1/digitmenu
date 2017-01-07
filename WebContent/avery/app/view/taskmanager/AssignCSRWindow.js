Ext.define('AOC.view.taskmanager.AssignCSRWindow',{
	extend:'Ext.window.Window',
	xtype:'assigncsrwindow',
	width:350,
	bodyPadding:10,
	controller:'assigncsrwindow',
	title:'<p style="font-size:14px;font-weight:bold;color:#2c3e50;">Assign CSR</p>',
	titleAlign:'center',
	constrainHeader:true,
	constrain:true,
	
	requires:[
        'AOC.store.AssignCSRStore',
        'AOC.view.taskmanager.AssignCSRController'
    ],
    layout:'form',
    defaults:{
		labelWidth:100,
		labelSeparator:'',
		width:300,
		labelStyle:'color:#2c3e50;font-size:13px;font-weight:bold;'
	},
	initComponent:function(){
		this.items = this.buildItems();
		this.bbar = this.buildBBar();
		this.callParent(arguments);
	},
	buildItems:function(){
		return [
			{
				xtype:'combo',
				displayField:'firstName',
				fieldLabel:'CSR',
				reference:'csrCombo',
				name:'CSR',
				valueField:'id',
				queryMode:'local',
				store:Ext.create('AOC.store.AssignCSRStore'),
				typeAhead:true
			}
		];
	},
	buildBBar:function(){
		return [
	        '->',
			{
				xtype:'whitebutton',
				text:'Save',
				handler:'onSaveBtnClicked'
			}
		];
	}
});