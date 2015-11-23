Ext.define('AOC.view.AOCHome', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.powerpayhome',
	requires:['AOC.view.base.BaseToolbar'],
	//layout:'fit',
	layout: {
        type: 'vbox',
        align: 'stretch'
    },
	dockedItems: [{
		xtype: 'basetoolbar',
		dock: 'top',
		title:'Home',
		items: [{
			xtype :'tbtext',
			text : '<b>Welcome</b>'
		},
		 {
  	   	  xtype : 'tbtext',
  	   	  defaultAlign:"right",       
  	   	  itemId:'appointmentTimerItemId',	
  	   	  hidden:true,
  	   	  text : '<div style="color: " loop="-1" scrollamount="2" width="100%"><b>Start Manual <a href="./custom/PowerPay/resources/images/PowerpayStartup.pdf" target="_blank"> "Click Here"</b></a></div>'
  	    }
		]
	}],
  
	
	initComponent : function() {
		Ext.apply(this, {
			items:[
				        {
	                       
				   			xtype :'panel',
				   		    margin : '0 10 10 20',
							border :false,
							flex:1,
							defaults : {
							 	 labelAlign : "left",
							 	 labelWidth : '100%',
							 	 achor :'80%'
							},
				items :[
		        {   
		        	layout:{type:'anchor'},
		        	xtype : 'displayfield',
		        	margin : '10 0 0 20',
		        	labelSeparator : "",
		        	fieldLabel: '<b>'+userFullName+', You are logged in as '+getuserRoleName(PowerPayUserRole)+'</b>'
		        			        	
		        }
		        ]
		        
				        },
				        
				        {
							xtype :'panel',
							border : false,
							flex:3,
							style:{
							    'display': 'table-cell',
							    'vertical-align': 'middle'
							},
				            
							items: [{
								xtype : 'image',         
								itemId : 'orgImgItemId', 
								border:true,
								style: {
							        'display': 'block',
							        'margin': 'auto'
							    },
								src:'./custom/PowerPay/resources/images/Neebo_logo.png'
							}
							 ]                          
						},
						{
							xtype:'panel',
							hidden:!isQueueProcessorEnabled,
							html:'<marquee><font size=2 color=red>System notification--[Contact Admin]message--" Purchase URL is disaled as Queue Processor is enabled."</font></marquee>',
							margin:'0 0 30 0',
							border:false
							},
							{
								xtype:'panel',
								hidden:false,
								style :'color:#FF0000 ; text-align: center;',
								html:'<b><font color=color:#FF0000 ; text-align: center;>For Best Experience look for</font> <font  style="cursor:pointer;color : #0085cf !important;"><u><span class="ParameterCls">Compatible Browsers</span></u></font></b>',
								margin:'0 0 30 0',
								border:false,
								listeners:{
								el:{
								'click':function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts){
								if(obj.target.className=="ParameterCls"){
								var win=Ext.create('Ext.window.Window',{
					     			   title:'Compatible Browsers',
					     			   height:200,
					     			   width:320,
					     			   modal:true,
					     			   closable:true,
					     			   ghost:false,
					     			   autoScroll: true,
					     			   items:[{
					     				   xtype:'panel',
					     				   cls:'powerpay',
					     				   border:false,
					     				   html:'<br><ul><li>Internet Explorer v10.0 and above</li><li>Mozilla Firefox v3.5 and above</li><li>Google Chrome v15.0 and above</li></ul>'
					     			   }]
								});
								win.show();
								}
							}
							}
							}
								}
				        
				        
				        ]
			
		});
		
		this.callParent(arguments);
	},

buildItems : function() {
	return [];
}
});