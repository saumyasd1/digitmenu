Ext.define('AOC.view.viewmail.ViewMail', { 
	extend : 'Ext.Container',
	requires : ['AOC.view.base.BaseToolbar','AOC.view.viewmail.EmailAttachmentInfoGrid','AOC.view.viewmail.ViewMailForm'],
	alias : 'widget.viewmail',
	controller:'viewMailController',
	itemId : 'viewMailItemId',
	initComponent : function() {
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
 	                    layout:'hbox',
 	                    items   : [{
 	                       xtype: 'component',
 	                      autoEl: {
 	                      	tag: 'img',
 	                          src: AOC.config.Settings.buttonIcons.backIcon
 	                      },
 	                  	    listeners: {
 	                  	    	 el : {
 	                  	    		    click    : 'backButton'
 	                  	    	 }
 	                        }
 	                      },
 	                       {
 	                        xtype  : 'component',
 	                         padding:'5 0 0 10',
 	                        itemId:'viewmaillabel',
 	                        html   : '<div  style="color: #333f49;font: 300 13px/16px helvetica, arial, verdana, sans-serif;"><b>View Mail</b></div>'
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
				     xtype:'viewmailform',
				     anchor:'100%',
				     reference:'webform'
				},{
				     xtype:'emailattachmentinfoGrid',
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
    	 	                       xtype   : 'whitebutton',
    	 	                       margin  : '0 0 0 10',
    	 	                       text    : 'Save',
    	 	                       itemId  : 'saveAttachment',
    	 	                       handler : 'SaveDetails'
    	 	                   },{
    	 	                       xtype   : 'whitebutton',
    	 	                       margin  : '0 0 0 10',
    	 	                       itemId  : 'downloadAttachments',
    	 	                       text    : 'Download Attachment(s)',
    	 	                       handler : 'CancelDetails'
    	 	                   },{
    	 	                       xtype   : 'whitebutton',
    	 	                       margin  : '0 0 0 10',
    	 	                       itemId  : 'cancel',
    	 	                       text    : 'Process Order',
    	 	                       handler : 'CancelDetails'
    	 	                   }
    	 	                  
    	 	                   ]
    	 	                    }]
    	 	        	      }
 	        	      ]

	 	});
	 	this.callParent(arguments);
	},
	updateHeaderLabel:function(label){
	    var cmp = this.down('#weborderlabel');
	    cmp.update('<div  style="color: #333f49;font: 300 13px/16px helvetica, arial, verdana, sans-serif;"><b>'+label+'</b></div>')
	}
});
