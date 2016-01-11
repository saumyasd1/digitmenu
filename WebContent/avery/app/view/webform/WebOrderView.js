Ext.define('AOC.view.webform.WebOrderView', {
	extend : 'Ext.Container',
	requires : ['AOC.view.base.BaseToolbar','AOC.view.webform.AttachmentInfoGrid','AOC.view.webform.WebOrderForm'],
	alias : 'widget.weborderview',
	controller:'webFormMain',
	itemId : 'webOrderViewItemId',
	initComponent : function() {
	    var me =this;
		Ext.apply(this, {
		    layout:'vbox',
 		      items:[
 		             {
 	                    xtype   : 'container',
 	                    width:'100%',
	 	           style   : {
	 	                	"background-color" : "#ffffff",
	 	                	"padding"          : "10px 20px 10px 20px"
	 	                    },
 	                    height  : 40,
 	                    items   : [{
 	                        xtype  : 'component',
 	                        html   : '<div  style="color: #333f49;font: 300 13px/16px helvetica, arial, verdana, sans-serif;"><b>New Web Orders</b></div>'
 	                      }]
 	        	      },
 	        	      {
 	        		 xtype:'container',
 	        		 width:'100%',
 	        		 flex:1,
 	        		 layout:'anchor',
 	        		 autoScroll:true,
 	        		 items:[
 	        	      {
				     xtype:'weborderform',
				     anchor:'100%'
				},{
				     xtype:'attachmentinfoGrid',
				     //minHeight:80,
				     margin:'0 200 10 200',
				     anchor:'100%'
    		             }]},
    		             {
    	 	                    xtype   : 'container',
    	 	                    width:'100%',
    	 	                    cls      : 'container-border',
    	 	                    style   : {
    	 	                	"background-color" : "#ffffff",
    	 	                	"padding"          : "10px 20px 10px 20px"
    	 	                    },
    	 	                    height  : 50,
    	 	                    items   : [{
    	 	                   xtype   : 'component',
    	 	                   flex    : 1,
    	 	                   html   : '<div  >  </div>',
    	 	                   cls	    : 'profile-info-header-text'
    	 	                   },{
    	 	                    xtype   : 'container',
    	 	                   layout    : {
    	 	                       type  : 'hbox',
    	 	                       align : 'middle',
    	 	                       pack  : 'end'
    	 	                   },
    	 	                   items   : [{
    	 	                       xtype   : 'plainbutton',
    	 	                       margin  : '0 0 0 10',
    	 	                       itemId  : 'cancel',
    	 	                       text    :'Cancel',
    	 	                       handler : 'CancelDetails',
    	 	                   },{
    	 	                       xtype   : 'whitebutton',
    	 	                       margin  : '0 0 0 10',
    	 	                       text    :'Save',
    	 	                       itemId  : 'save',
    	 	                       handler:'SaveDetails',
    	 	                   }
    	 	                   ]
    	 	                    }]
    	 	        	      }
 	        	      ]

	 	});
	 	this.callParent(arguments);
	}
});
