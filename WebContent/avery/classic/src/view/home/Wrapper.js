Ext.define('AOC.view.home.Wrapper', {
	extend : 'Ext.Container',
	alias : 'widget.homewrapper',
	//requires:['AOC.view.home.HomePageOrderList'],
	controller:'homewrappercontroller',
	layout: {
        type: 'border'
    },
	initComponent : function() {
		Ext.apply(this, {
			items:this.buildItems()	
		});
		this.callParent(arguments);
	},
	buildItems:function(){
	    return [
	        {
	        	region:'north',
	        	minHeight:60,
	        	bodyPadding:10,
	        	layout:{
	        		type:'vbox',
	        		align:'stretch'
	        	},
	        	items:[
	        	     {
	        	    	 xtype:'fieldcontainer',
	        	    	 flex:1,
	        	    	 layout:{
	        	    		 type:'hbox',
	        	    		 align:'stretch'
	        	    	 },
	        	    	 defaults:{
	        	    		 labelStyle:Settings.config.defaultFormLabelStyle,
	        	    		 labelSeparator:'',
	        	    		 labelWidth:100
	        	    	 },
	        	    	 items:[
							{
								xtype:'displayfield',
								value:'Order Queue Status',
								hideLabel:true,
								felx:1,
								margin:'0 100 0 0',
								style:AOC.config.Settings.config.tabHeaderTitleStyle
							},
							{
								xtype:'displayfield',
								itemId:'siteDisplay',
								fieldLabel:'Site',
								flex:.5,
								currentItemRef:'siteDisplayfield',
								reference:'siteDisplayfield',
								hidden:true,
								listeners : {
									'afterrender':'onAfterRenderSiteDisplayfield'
								}
							 },
							{
								xtype:'combo',
								name: 'siteId',
								fieldLabel:'Site',
								flex:.5,
								labelWidth:50,
							 	currentItemRef:'siteCombo',
							 	editable:false,
								displayField:'name',
								queryMode :'local',
								reference:'siteCombo',
								valueField: 'id',
								store:Ext.create('AOC.store.SiteStore'),
								listeners : {
									'afterrender':'onAfterRenderSiteCombo',
									'change':'onChangeSiteCSRCodeCombo'
								}
							},
							{
						        xtype: 'tagfield',
						        fieldLabel: 'CSR Code',
						        flex:1,
						        store: Ext.data.StoreManager.lookup('AssignCSRStore'),
						        displayField:'csrName',
								valueField:'id',
						        filterPickList: true,
						        queryMode: 'local',
						        reference:'csrCombo',
								name:'assignCSR',
								margin:'0 20',
								listeners:{
									'change':'onChangeSiteCSRCodeCombo'
								}
						    },
							{
								xtype:'combo',
								displayField:'Name',
								fieldLabel:'Refresh Rate',
								valueField:'id',
								value:0,
								flex:.6,
								queryMode:'local',
								reference:'refreshRateCombo',
								name:'refreshRateCombo',
								//editable:false,
								store:new Ext.data.JsonStore({
									data:[
									    {Name:'Don\'t Refresh',id:0},
									    {Name:'5 min', id:5},{Name:'10 min',id:10},{Name:'15 min', id:15}    
									],
									fields:['Name','id']
								}),
								listeners:{
									select:'onRefreshRateComboSelect'
								}
							},
							{
								xtype:'button',
								cls:'aoc-btn',
								margin:'0 0 0 10',
								tooltip:'<font color="blue">Quick Refresh</font>',
								iconCls:'fa fa-refresh aoc-icon',
								handler:'onRefreshClick'
							} 
	        	    	 ]
	        	     }
	        	]
	        },
            {
            	xtype:'orderqueuestatuslist',
            	region:'center',
            	reference:'orderQueueStatusList'
            }
        ]
	}
});