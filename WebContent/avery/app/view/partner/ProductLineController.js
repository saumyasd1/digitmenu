Ext.define('AOC.view.productline.ProductLineController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.productlineMain',
    runTime : AOC.config.Runtime,
    requires:['AOC.view.advsearch.ProductLineAdvanceSearch'],
    SaveDetails:function(){
		Ext.getBody().mask('Saving....');
		var me=this;
		var createproductline=this.getView();
		var panel=createproductline.down('#listPanel');
		var productline=Ext.ComponentQuery.query("#partnerproductlinegriditemId")[0];
		var valueObj='',valueObj2='',form=this.getView().down('form');
		var AdvancedPropertiesForm=this.getView().down('#AdvancedPropertiesForm');
		var editMode=this.getView().editMode,url='';
		var length=0;
		if(editMode){
			Id=createproductline.productlineId;
			url=applicationContext+'/rest/productLines/'+Id;
			form.updateRecord();
			AdvancedPropertiesForm.updateRecord();
			methodMode='PUT';
			valueObj=form.getRecord().getChanges();
			valueObj2=AdvancedPropertiesForm.getRecord().getChanges();
			var parameters=Ext.JSON.encode(valueObj);
			var parameters=Ext.JSON.encode(valueObj2);
			length=Object.keys(valueObj).length;
			Msg='<b>Product Line Updated Successfully</b>';
		}
		else{
			Id=productline.partnerid;
			partnerName=productline.partnerName;
			var partner='';
			partner={id:Id,partnerName:partnerName};
			url=applicationContext+'/rest/productLines';
			valueObj=form.getValues(false,true,false,true);
			valueObj2=AdvancedPropertiesForm.getValues(false,true,false,true);
			parameters={
					rboName:valueObj.rboName,
					productLineType:valueObj.productLineType,
					csrName:valueObj.csrName,
					packingInstruction:valueObj.packingInstruction,
					splitShipSetBy:valueObj.splitShipSetBy,
					invoiceLineInstruction:valueObj.invoiceLineInstruction,
					manufacturingNotes:valueObj.manufacturingNotes,
					attachmentMappingName2:valueObj.attachmentMappingName2,
					variableDataBreakdown:valueObj.variableDataBreakdown,
					shippingOnlyNotes:valueObj.shippingOnlyNotes,
					orderSchemaType:valueObj2.orderSchemaType,
					orderSchemaID:valueObj2.orderSchemaID,
					orderMappingID:valueObj2.orderMappingID,
					attachmentRequired:valueObj2.attachmentRequired,
					attachmentSchemaType_1:valueObj2.attachmentSchemaType_1,
					attachmentMappingID_1:valueObj2.attachmentMappingID_1,
					attachmentIdentifier_1:valueObj2.attachmentIdentifier_1,
					attachmentSchemaID_2:valueObj2.attachmentSchemaID_2,
					attachmentSchemaType_2:valueObj2.attachmentSchemaType_2,
					attachmentMappingID_2:valueObj2.attachmentMappingID_2,
					attachmentIdentifier_2:valueObj2.attachmentIdentifier_2,
					attachmentSchemaID_3:valueObj2.attachmentSchemaID_3,
					attachmentSchemaType_3:valueObj2.attachmentSchemaType_3,
					attachmentMappingID_3:valueObj2.attachmentMappingID_3,
					attachmentIdentifier_3:valueObj2.attachmentIdentifier_3,
					csrEmail:valueObj.csrEmail,
					preProcessPID:valueObj2.preProcessPID,
					partner:partner
		    	};
			methodMode='POST';
			length=1;
			Msg='<b>Product Line Added Successfully</b>';
		}
		if(length>0){
			if(panel.getForm().isValid()){
				Ext.Ajax.request( {
					method: methodMode,
				    jsonData : parameters,	
				    url : url,
				    success : function(response, opts) {
				    	Ext.getBody().unmask();
				    	createproductline.destroy();
			  			Ext.Msg.alert('Alert Message',Msg);
			  			productline.store.load();
				  		
		        },
		        failure: function(response, opts) {
		        	Msg=response.responseText;
		        	Msg=Msg.replace("Exception:"," ");
		        	Ext.Msg.alert('Alert Message',Msg);
		        	Ext.getBody().unmask();
		        	createproductline.destroy();
              }
      	});
		}
		else{
				createproductline.down('#messageFieldItemId').setValue('<font size=2 color=red>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please fill valid entry in the field marked as <img src='+errorIcon+' width="15" height="15"></font>').setVisible(true);
		}
		this.runTime.setWindowInEditMode(false);
	}
    },
	CancelDetails:function()
	{       
		    Ext.getBody().unmask();
			this.getView().destroy();
			this.runTime.setWindowInEditMode(false);
			this.runTime.getActiveGrid().store.load();
	},
	createproductline:function(){
			win=Ext.create('AOC.view.partner.CreatePartnerProductLine',{
				modal:true,
				partnerName:this.getView().partnerName
			});
			win.down('#titleItemId').setValue('<font size=3><b>Add Partner Product Line</b></font>').setVisible(true);
			win.show();
       
	},
	onClickMenu:function(obj,rowIndex,colIndex,item,e,record){
	      var me=this;
	      var callout = Ext.widget('callout', {
	          cls                  : 'white more-menu-item-callout extra',
	          html                 : me.buildMenuTpl.apply("{}"),
	          target               : e.target,
	          calloutArrowLocation : 'top-left',
	          relativePosition     : 't-b',
	          relativeOffsets      : [52,23],
	          dismissDelay         : 0,
	          listeners            : {
                afterrender : me.onAfterRenderEditCallout,
                edit: function(cmp){
                	var win=Ext.ComponentQuery.query('#createpartnerproductlineItemId')[0];//Added ItemId(16/07/2015)
 	      			if(!win){
 	      				var data=e.record;
 	      				 var id=data.id;
 	      			    win=Ext.create('AOC.view.partner.CreatePartnerProductLine',{
 	      				modal:true,
 	      				//title:'Edit Partner product Line',
 	      				partnerName:me.getView().partnerName,
 	      			    editMode:true,
 	      			    rec:data,
 	      			    productlineId:id
 	      			});
 	      			 win.down('#titleItemId').setValue('<font size=3><b>Edit Partner Product Line</b></font>').setVisible(true);
 	      			  win.show();
 	              }
                	callout.destroy();
                },
                deleteproductline: function(cmp){
                	var data=e.record;
	     			    var id=data.id;
	     			    var partner='';
	     			    partner={id:id};
	     			    Ext.MessageBox.confirm('Confirm Action', '<b>Are you sure,you want to delete this product line</b>', function(response) {
 	     				  if (response == 'yes') {
 	     					Ext.Ajax.request({
     							method:'DELETE',
     							url:applicationContext+'/rest/productLines/'+id,
     				        success : function(response, opts) {
     							Ext.Msg.alert('Alert Message','<b>Product Line Deleted Succesfully</b>');
     							me.runTime.getActiveGrid().store.load();
     				        },
     				        failure: function(response, opts) {
     		                }
     		        	});
 	     				  }else if(response == 'no'){
 	     				  return true;
 	     				  }
 	     				  });
 		        	 this.destroy();
                	callout.destroy();
                }
            }
	          });
	      callout.show();   
	  },
	  onAfterRenderEditCallout : function(cmp){
	        var me = this;
	        cmp.el.on({
	            delegate: 'div.user-profile-menu-item',
	            click    : function(e,element){
	                var el    = Ext.get(element),
	                    event = el.getAttribute('event');
	                if (event && !el.hasCls('edit-menu-disabled')){
//	                    cmp.destroy();
	                    me.fireEvent(event);
	                }
	            }
	        });
	    },
	  buildMenuTpl : function(){
	    	  var me=this;
	    	 return Ext.create('Ext.XTemplate',
	    	      '<div style="width: 140px !important;border-bottom: none !important;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="edit"">Edit</div>',
	              '</tpl>',
	              '<div style="width: 140px !important;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="deleteproductline"">Delete</div>',
	              '</tpl>'
	          );
	       },
//showmenu:function(view,rowIndex,colIndex,item,e){
//	var runtime=this.runTime;
//	var me=this;
//	 {
//		 {
//				var menu=Ext.create('Ext.menu.Menu', {
//     		    width: 100,
//     		    margin: '0 0 10 0',
//     		    items: [{
//     		        text: 'Edit',
//     		        handler:function()
//     		        {    
//     		    	    var win=Ext.ComponentQuery.query('#createpartnerproductlineItemId')[0];//Added ItemId(16/07/2015)
//     	      			if(!win){
//     	      				var data=e.record;
//     	      				 var id=data.id;
//     	      			    win=Ext.create('AOC.view.partner.CreatePartnerProductLine',{
//     	      				modal:true,
//     	      				//title:'Edit Partner product Line',
//     	      				partnerName:me.getView().partnerName,
//     	      			    editMode:true,
//     	      			    rec:data,
//     	      			    productlineId:id
//     	      			});
//     	      			 win.down('#titleItemId').setValue('<font size=3><b>Edit Partner Product Line</b></font>').setVisible(true);
//     	      			  win.show();
//     	              }
//     		        }
//     		    },{
//     		        text: 'Delete',
//     		    	handler:function()
//     				{   
//     		    		
//     					var data=e.record;
// 	     			    var id=data.id;
// 	     			    var partner='';
// 	     			    partner={id:id};
// 	     			    Ext.MessageBox.confirm('Confirm Action', '<b>Are you sure,you want to delete this product line</b>', function(response) {
//     	     				  if (response == 'yes') {
//     	     					Ext.Ajax.request({
//	     							method:'DELETE',
//	     							url:applicationContext+'/rest/productLines/'+id,
//         				        success : function(response, opts) {
//         							Ext.Msg.alert('Alert Message','<b>Product Line Deleted Succesfully</b>');
//         							me.runTime.getActiveGrid().store.load();
//         				        },
//         				        failure: function(response, opts) {
//         		                }
//         		        	});
//     	     				  }else if(response == 'no'){
//     	     				  return true;
//     	     				  }
//     	     				  });
//     		        	this.destroy();
//     				}
//     		    }
//     		  ]
//     		});
//     		
//     	menu.showAt(e.getXY());
//			}
//	 }
//  },
	openAdvancedSearchWindow:function(e, t, eOpts)
	{
		 var temp=Ext.ComponentQuery.query('#productlinesearchWindowItemId')[0];
if(!temp){
		 temp = Ext.create('AOC.view.base.BaseWindow',{
				 	height:400,
					width:300,
					//title:advancedSearchWindowTitle,
					itemId:'productlinesearchWindowItemId',
					layout: 'fit',
					draggable: false,
					modal:true,
					closeAction:'hide',
				 	listeners:{ 
//			             beforedestroy: function(btn) {
//				 		 cmp.enable();
//				 	}
		        },
				 	items : [{  xtype : 'productlineadvancesearch' }]
			 });
        }
			if (Ext.isIE || Ext.isGecko) {
			    browser = "IE";
			    var d = Ext.get(e.getTarget());
			    var width = temp.width; //width of advanced search panel
			   // box = this.getBox();
			    width = width - 25; //remove margin
			    x = d.getX();
			    y = d.getY();
			    temp.showAt(x - width, y + 26);
			}
			else if (Ext.isChrome || Ext.isSafari) {
				 browser = "Chrome";
				 var d = Ext.get(e.getTarget());
				 var width = temp.width;
				 width=width-24;
				 x=d.getX();
				 y=d.getY();
	        		 temp.show();
			}
			return false;
		},
  backButton:function()
  {
		   var panel=Ext.ComponentQuery.query('#partnerPanel')[0];
	       //var partnergrid=Ext.ComponentQuery.query('#partnertitleItemid')[0];
		  // partnergrid.setText('<b>Partner Management</b>');
	       var partnerMangement=panel.down('#PartnerMangementitemId');
	       panel.getLayout().setActiveItem(partnerMangement);
	       partnerMangement.getView().refresh();
	       partnerMangement.getStore().load();
	},
	getProductLineBasedOnSearch:function() {
	 	var valueObj=this.getView().getForm().getValues(false,true);
	 	var FromDate=valueObj.fromDate;
	 	var ToDate=valueObj.toDate;
	 	if(FromDate<=ToDate)
	 		{
    	if(!valueObj.hasOwnProperty('datecriteriavalue'))
    		valueObj.datecriteriavalue='createdDate';
		var parameters=Ext.JSON.encode(valueObj);
    	var grid=this.runTime.getActiveGrid();
    	var archievegrid=Ext.ComponentQuery.query('#productLineArchiveGrid')[0];
    	if(archievegrid !=null)
    		{
    		var currentView = Ext.ComponentQuery.query('#archivemanageitemId')[0];
    		var valueObj=(currentView.lookupReference('cmbformArchive')).getForm().getValues(false,true);
			var grid=archievegrid;
    		}
    	var store=grid.store;
        store.proxy.setFilterParam('query');
        store.setRemoteFilter(true);
        if (!store.proxy.hasOwnProperty('filterParam')) {
            store.proxy.setFilterParam('query');
        }
        store.proxy.encodeFilters = function(filters) {
            return filters[0].getValue();
        };
        store.filter({
        	id: 'query',
            property:'query',
            value:parameters
        });
        grid.down('#clearadvanedsearch').show();
        this.getView().up('window').hide();
	 }
	 	 else
	 		 {
			    var productlinesearch=Ext.ComponentQuery.query('#productlinesearchWindowItemId')[0];
	 	            productlinesearch.down('#messageFieldItemId').setValue('<center><font color=red>From Date must be less than or equal to To Date</font></center>').setVisible(true);
	 		 } 	
	},
	clearAdvancedSerach:function(widget){
		 var temp=Ext.ComponentQuery.query('#productlinesearchWindowItemId')[0];
		 temp.destroy();
		 var grid=this.getView();
		   	var store = grid.store;
			store.clearFilter();
			store.loadPage(1);
			widget.setVisible(false);
			var temp=grid.down('#advancesearchbutton');
		    temp.enable();
	},
	getQuickSearchResults:function(cmp){
		var store=this.getView().store;
		   var value=cmp.getValue();
		   if(value!=null && value!=''){
	       store.proxy.setFilterParam('query');
	       var parameters='{"productLineType":"'+value+'"}';
	       store.setRemoteFilter(true);
	       if (!store.proxy.hasOwnProperty('filterParam')) {
	           store.proxy.setFilterParam('query');
	       }
	       store.proxy.encodeFilters = function(filters) {
	           return filters[0].getValue();
	       };
	       store.filter({
	    	   id: 'query',
	           property:'query',
	           value:parameters
	       });
		   }
		   cmp.orderedTriggers[0].show();
	},
	   getSearchResults:function(cmp,e){
		   var me=this;
		   if (e.getKey() == e.ENTER) {
			   me.getQuickSearchResults(cmp);
		   }
	   },
	   clearSearchResults:function(cmp){
		   var grid=this.getView();
		   	var store = grid.store;
			store.clearFilter();
			store.loadPage(1);
			cmp.setValue('');
			cmp.orderedTriggers[0].hide();
	   },
	   HideMandatoryMessage:function(){
		   var createproductline=this.getView();
		   createproductline.down('#messageFieldItemId').setValue('').setVisible(true);
		   createproductline.down('#messageFieldItemId').setHidden('true');
	   },
	   notifyByMessage:function()
	    {
		    var productlinesearch=Ext.ComponentQuery.query('#productlinesearchWindowItemId')[0];
		    productlinesearch.down('#messageFieldItemId').setValue('').setVisible(true);
	    }
});