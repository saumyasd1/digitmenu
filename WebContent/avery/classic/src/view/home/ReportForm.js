Ext.define('AOC.view.home.ReportForm',{
    extend: 'Ext.form.Panel',
    controller:'reportcontroller',
    alias:'widget.reportform',
    runTime: AOC.config.Runtime,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onReportFormAfterRender'
    },
    initComponent : function(){
        var me = this;
        Ext.apply(me,{
            items : me.buildItems()
        });
        me.callParent(arguments);
        me.helper = AOC.util.Helper;
    },
    bodyPadding:10,

    buildItems : function(){
        var me = this;
        return [
            {
				xtype: 'fieldcontainer',
	            layout: 'hbox',
	            items:[
					{
						xtype:'combo',
						reference:'partnerCombo',
						itemId:'partnerCombo',
						store : Ext.data.StoreManager.lookup('partnerStoreId') != null ? Ext.data.StoreManager.lookup('partnerStoreId') : Ext.create('AOC.store.PartnerManagementStore',{storeId:'partnerStoreId'}),
						valueField:'id',
						name:'partnerName',
						editable:false,
						allowBlank : false,
						reference:'partner',
						margin:'0 10 0 0',
						width:210,
						displayField:'partnerName',
						emptyText:'Select Partner',
						listeners:{
							'change':'onPartnerChange',
							'afterrender': function(combo){
	                    		var store = combo.store,
                    				obj ={id:'all',partnerName:'Select All'};
	                    		store.on('load',function(){
	                    			store.insert(0,new Ext.data.Record(obj));
	                    		},store);
							}
						}
					},
					{
						xtype:'combo',
						name:'rbo',
						labelAlign:'top',
						margin:'0 10 0 0',
						width:210,
						allowBlank : false,
						reference:'rboName',
						displayField:'rboName',
						valueField:'id',
						disabled:true,
						emptyText:'Select RBO',
						queryMode:'local',
						store:Ext.create('Ext.data.Store',{
				     	   	 fields : ['rboName','id','productLineType'],	
					         data : []
				        })
	                },
					{
	                	xtype : 'combo',
						name:'Status',
						hideLabel:true,
						width:210,
						margin:'0 10 0 0',
						reference:'status',
						allowBlank : false,
						disabled:true,
						displayField:'value',
						valueField:'code',
						queryMode :'local',
						emptyText:'Select Status',
	                	store: Ext.data.StoreManager.lookup('code') == null ? AOC.util.Helper.getCodeStore('orderfilequeue') : Ext.data.StoreManager.lookup('orderfilequeueid'),
	                    listeners:{
	                    	afterrender:function(field){
	                    		var store = field.store,
	                    			obj ={code:'all',value:'Select All'},
	                    			index=store.find("code",'all','',false,false,true);
	                    		if(index == -1){
	                    			store.insert(0,new Ext.data.Record(obj));
	                    		}
	                    	}
	                    }
					}
				]
	        },{
				xtype: 'fieldcontainer',
	            layout: 'hbox',
	            items:[
					{
	                    xtype: 'combo',
	                    name: 'siteId',
	                    itemId:'site',
	                    emptyText:'Select Site',
	                    width:210,
	                    editable: false,
	                    margin:'5 10 0 0',
	                    displayField: 'name',
	                    valueField: 'id',
	                    reference: 'siteName',
	                    store: Ext.create('AOC.store.SiteStore'),
	                    queryMode: 'local',
	                    listeners:{
	                    	afterrender:function(field){
	                    		if(AOCRuntime.getUser().role == 1){
		                    		var store = field.store,
		                    			obj ={id:'all',name:'Select All'};
		                    		store.on('load',function(){
		                    			store.insert(0,new Ext.data.Record(obj));
		                    		},store);
	                    		}
	                    	},
	                    	select:'onSiteSelect'
	                    }
	                },
	                {
	    				xtype:'combo',
	    				displayField:'csrName',
	    				reference:'csrCombo',
	    				name:'CSR',
	    				emptyText:'Select CSR Name',
	    				valueField:'userId',
	    				width:210,
	    				disabled:true,
	    				margin:'5 10 0 0',
	    				queryMode:'local',
	    				store:Ext.create('AOC.store.AssignCSRStore') ,
	    				typeAhead:true,
	    				listeners:{
		                    	afterrender:function(field){
		                    		if(AOCRuntime.getUser().role == 1){
			                    		var store = field.store,
			                    			obj ={userId:'all',csrName:'Select All'};
			                    		store.on('load',function(){
			                    			store.insert(0,new Ext.data.Record(obj));
			                    		},store);
		                    		}
		                    	}
		                    }
	    			},
	    			{
	    				xtype:'combo',
	    				name:'timeZone',
	    				emptyText:'Select Time Zone',
	    				width:210,
	    				reference:'timeZone',
	    				margin:'5 10 0 0',
	    				store:[['HKT','HKT'],['EDT','EDT'],['EST','EST']]
	    			}
				]
	        },
			{
				xtype:'tbtext',
				height:10,
				margin:'10 0 0 10',
				text:'Please select the type of report you would like to get:',
				style:AOC.config.Settings.config.defaultFormLabelStyle
			},
			{
				xtype : 'radiogroup',
				name: 'rb',
				fieldLabel : '',
				width:600,
				labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
				reference:'radioGroup',
				margin:'10 0 0 10',
				items:[
					{ boxLabel: 'Daily Report', name: 'rb', inputValue: 'dailyReport', checked: true },
					{ boxLabel: 'Detail Status Report', name: 'rb', inputValue: 'openReport' }
				],
			    listeners:{
			    	'change':'onRadioButtonChange'
			    }
        
			},
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				margin : '5 0 10 10',
				defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign,
					labelWidth:150
				},
				items:[
					{
						xtype : 'datefield',
						reference:'fromDate',
						hidden:true,
						fieldLabel : 'From Date ',
						width:250,
						allowBlank : true,
						selectOnTab : true,
						listeners : {
							afterrender : function(datefield) {
								datefield.setValue(new Date());
							}
						}
					},
					{
						xtype : 'datefield',
						fieldLabel : 'To Date ',
						reference:'toDate',
						width:250,
						margin:'0 0 0 10',
						hidden:true,
						allowBlank : true,
						selectOnTab : true,
						listeners : {
							afterrender : function(datefield) {
								datefield.setValue(new Date());
							},
							focus: 'notifyByMessage'
						}
					}
				]
			}
        ];
    },
    buttons:[
         {
	    	text:'Get Report',
	    	formBind:true,
	    	listeners:{
	    		click:'getReport'
	    	}
         }
     ]
});