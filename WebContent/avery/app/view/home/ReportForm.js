Ext.define('AOC.view.home.ReportForm',{
    extend        : 'Ext.form.Panel',
    controller	  :	'reportcontroller',
    alias         : 'widget.reportform',
    border:  	  '0 1 1 1',
    layout        : {
        type   : 'vbox',
        align  : 'stretch'
    },
    //height:200,
    initComponent : function(){
        var me = this;
        Ext.apply(me,{
            items : me.buildItems()
        });
        me.callParent(arguments);
        me.helper = AOC.util.Helper;
    },

    buildItems : function(){
        var me = this;
        return [{
			xtype: 'fieldcontainer',
            layout: 'hbox',
            margin : '20 0 0 10',
            items:[{
            	xtype:'combo',
				reference:'partnerCombo',
				itemId:'partnerCombo',
				store:'PartnerManagementStore',
				valueField:'id',
				name:'partnerName',
				editable:false,
				allowBlank : false,
				reference:'partner',
				margin:'0 20 0 0',
				flex:1,
				displayField:'partnerName',
				emptyText:'Select Partner',
				listeners:{
					'change':'onPartnerChange'
				}
            },{
            	xtype:'combo',
            	name:'rbo',
            	labelAlign:'top',
            	margin:'0 20 0 0',
            	flex:1,
            	reference:'rboName',
            	displayField:'rboName',
            	valueField:'id',
            	emptyText:'Select RBO'
                },{
                	xtype : 'combo',
					name:'Status',
					labelSeparator : '',
					flex:1,
					margin:'0 20 0 0',
					reference:'status',
					labelAlign : 'top',
					displayField:'value',
					valueField:'code',
					queryMode :'local',
					emptyText:'Select Status',
                	store: Ext.data.StoreManager.lookup('code') == null ? AOC.util.Helper.getCodeStore('orderfilequeue') : Ext.data.StoreManager.lookup('orderfilequeueid')
                    }]
        },{
        	xtype:'displayfield',
        	height:10,
        	margin:'10 0 0 10',
        	value:'Please select the type of report you would like to get:'
        },{
				xtype : 'radiogroup',
				name: 'rb',
				fieldLabel : '',
				width:600,
				hidden:false,
				labelSeparator : '',
				reference:'radioGroup',
				margin:'20 0 0 10',
				labelAlign : 'top',
				items:[
			            { boxLabel: 'Daily Report', name: 'rb', inputValue: 'dailyReport', checked: true },
			            { boxLabel: 'Detail Status Report', name: 'rb', inputValue: 'openReport' }
			          ],
			    listeners:{
			    	'change':'onRadioButtonChange'
			    }
        
        },{

			xtype: 'fieldcontainer',
            layout: 'hbox',
            margin : '5 0 0 10',
            items:[{
			xtype : 'datefield',
			reference:'fromDate',
			hidden:true,
			fieldLabel : 'From Date ',
			width:250,
			labelSeparator : '',
			labelAlign : 'top',
			allowBlank : true,
			selectOnTab : true,
			listeners : {
			    render : function(datefield) {
			        datefield.setValue(new Date());
			    }
			}
		},
		{
			xtype:'tbspacer',
			height:5,
			width:30
		},
		{
			xtype : 'datefield',
			fieldLabel : 'To Date ',
			reference:'toDate',
			width:250,
			hidden:true,
			labelSeparator : '',
			labelAlign : 'top',
			allowBlank : true,
			selectOnTab : true,
			listeners : {
			    render : function(datefield) {
			        datefield.setValue(new Date());
			                },
			                'focus': 'notifyByMessage'
			        }
		}]}

        ];
    },
    buttons:[{
    	text:'Get Report',
    	listeners:{
    		'click':'getReport'
    	}
    }]
   
});