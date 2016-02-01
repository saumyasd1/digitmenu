Ext.define('AOC.view.partner.PartnerController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.partnerMain',
    runTime : AOC.config.Runtime,
    requires:['AOC.view.advsearch.PartnerAdvanceSearch','AOC.util.Helper'],
    SaveDetails:function(){
		Ext.getBody().mask('Saving....');
		var me=this;
		var Msg='';
		var createpartner=Ext.ComponentQuery.query("#createpartnerItemId")[0];
		var grid=Ext.ComponentQuery.query("#PartnerMangementitemId")[0];
		var panel=createpartner.down('#listPanel');
		var valueObj='',form=this.getView().down('form');
		var methodMode='';
		var editMode=this.getView().editMode,url='';
		var length=0;
		if(editMode){
			partnerId=createpartner.partnerId;
			url=applicationContext+'/rest/partners/'+partnerId;
			form.updateRecord();
			methodMode='PUT';
			valueObj=form.getRecord().getChanges() ;
			length=Object.keys(valueObj).length;
			Msg='Partner Updated Successfully';
		}
		else{
			url=applicationContext+'/rest/partners';
			valueObj=form.getValues(false,true,false,true);
			//valueObj.active=false;
			methodMode='POST';
			length=1;
			Msg='Partner Added Successfully';
		}
		var parameters=Ext.JSON.encode(valueObj);
		if(length>0){
			if(panel.getForm().isValid()){
				Ext.Ajax.request( {
					method: methodMode,
				    jsonData : parameters,	
				    url : url,
		        success : function(response, opts) {
		        	    Ext.getBody().unmask();
		        	    createpartner.destroy();
		        	    AOC.util.Helper.fadeoutMessage('Success',Msg);
			  			grid.store.load();
		        },
		        failure: function(response, opts) {
		        	Msg=response.responseText;
		        	Msg=Msg.replace("Exception:"," ");
		        	//  AOC.util.Helper.fadeoutMessage('Success',Msg);
		        	Ext.Msg.alert('Alert Message',Msg);
		        	Ext.getBody().unmask();
		        	createpartner.destroy();
              }
      	});
		}
		else{
			createpartner.down('#messageFieldItemId').setValue('<font size=2 color=red>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please fill valid entry in the field marked as <img src='+errorIcon+' width="15" height="15"></font>').setVisible(true);
		}
			
		this.runTime.setWindowInEditMode(false);
	}
		else{
			createpartner.down('#messageFieldItemId').setValue('<font size=2 color=red>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No field is edited,Please edit field</font>').setVisible(true);
		}
    }
,
	CancelDetails:function()
	{   
	Ext.getBody().unmask();
	this.getView().destroy();
	this.runTime.setWindowInEditMode(false);
	this.runTime.getActiveGrid().store.load();
	},
	createpartner:function(){
		var win=Ext.ComponentQuery.query("#createpartnerItemId")[0];
		if(!win){
		win=Ext.create('AOC.view.partner.CreatePartner',{
			modal:true
		});
		win.down('#titleItemId').setValue('<font size=3><b>Add Partner</b></font>').setVisible(true);
		win.show();
    }
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
                    	var data=e.record;
 	     		    	var win=Ext.ComponentQuery.query('#createpartnerItemId')[0];
 		     			if(!win){
 		     			    var id=data.id;
 		     			    var partnerName=data.get('PartnerName');
 		     			    win=Ext.create('AOC.view.partner.CreatePartner',{
 		     				modal:true,
 		     			    editMode:true,
 		     			    rec:data,
 		     			    partnerId:id,
 		     			    partnerName:partnerName,
 		     			    listeners: {
 		     	        	'close':function( panel, eOpts ) {
 		     	        		 Ext.getBody().unmask();
 		     	        		 win.destroy();
 		     	            }
 		     	        }
 		     			});
 		     	      win.down('#titleItemId').setValue('<font size=3><b>Edit Partner</b></font>').setVisible(true);
 	     			  win.show();
 	     			}
                    	callout.destroy();
                    },
                    deletepartner: function(cmp){
                    	var data=e.record;
		     			var id=data.id;
		     			var productLineCount=data.get('productLineCount');
		     			var addressCount=data.get('addressCount');
		     			var orderQueueCount=data.get('orderQueueCount');
		     			if(productLineCount!=0 || addressCount!=0 || orderQueueCount!=0)
		     		   Ext.MessageBox.alert('',deletePartner);
		     			else
		     				{
	     			   Ext.MessageBox.confirm('Confirm Action', '<b>Are you sure,you want to delete this partner</b>', function(response) {
	     				  if (response == 'yes') {
	     						Ext.Ajax.request({
	     							method:'DELETE',
	     							url:applicationContext+'/rest/partners/'+id,
         				        success : function(response, opts) {
         				        	  AOC.util.Helper.fadeoutMessage('Success','Partner Deleted Succesfully');
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
		     				}
		     			callout.destroy();
                    },
                    productLine:function(cmp){
                    	
     		        	var data=e.record;
     		        	var id=data.id;
     		        	var partnerName=data.get('partnerName');
     		        	store = Ext.create('AOC.store.PartnerProductLineStore',{
     						storeId:'PartnerProductLineStoreStoreId',
     						totalCount:'total',
     						
     						proxy: {
     							type: 'rest',
     					         url        : applicationContext+'/rest/productLines/partner/'+id+'?partnerId='+id,
     					        reader      : {
     					            type          : 'json',
     					            rootProperty          : 'productlines',
     					            totalProperty : 'totalCount'
     					        }
     					    }
     					});
     		        	panel=Ext.ComponentQuery.query('#partnerPanel')[0];
     		            var  partnerproduct=Ext.ComponentQuery.query('#partnerproductlinegriditemId')[0];
     		            partnerproduct.bindStore(store);
     		        	panel.getLayout().setActiveItem(1);
     		        	//var partnergrid=Ext.ComponentQuery.query('#partnertitleItemid')[0];
     		        	partnerproduct.partnerid=id;
     		        	partnerproduct.partnerName=partnerName;
     		        	partnerproduct.down('#pagingtoolbar').bindStore(store);
     		        	me.runTime.setActiveGrid(partnerproduct);
     		        	//partnergrid.setText('<b></b>');
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
	    	      '<div style="width: 140px !important;border-bottom: none !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="edit"">Edit</div>',
	              '</tpl>',
	              '<div style="width: 140px !important;border-bottom: none !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="deletepartner"">Delete</div>',
	              '</tpl>',
	              '<div style="width: 140px !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="productLine"">View ProductLine</div>',
	    	     '</tpl>'
	          );
	       },
	openAdvancedSearchWindow:function(e, t, eOpts)
	{
		
	 var temp=Ext.ComponentQuery.query('#partneradvancesearchWindowItemId')[0];
	 if(!temp){
	
			 temp = Ext.create('AOC.view.base.BaseWindow',{
					 	height:390,
						width:300,
						itemId:'partneradvancesearchWindowItemId',
						layout: 'fit',
						draggable: false,
						modal:true,
						closeAction:'hide',
					 	items : [{  xtype : 'partneradvancesearch' }]
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
			getPartnerBasedOnSearchParameters: function() {
		 	var valueObj=this.getView().getForm().getValues(false,true);
		 	var FromDate=this.lookupReference('fromDate').getValue();
		 	var ToDate=this.lookupReference('toDate').getValue();
		 	if(FromDate<=ToDate)
		 		{
	    	if(!valueObj.hasOwnProperty('datecriteriavalue'))
	    		valueObj.datecriteriavalue='createdDate';
			var parameters=Ext.JSON.encode(valueObj);
	    	var grid=this.runTime.getActiveGrid();
	    	var archievegrid=Ext.ComponentQuery.query('#partnerArchiveGrid')[0];
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
		    var partnersearch=Ext.ComponentQuery.query('#partneradvancesearchWindowItemId')[0];
		 	partnersearch.down('#messageFieldItemId').setValue('<center><font color=red>From Date must be less than or equal to To Date</font></center>').setVisible(true);;
			 }
		},
		clearAdvancedSerach:function(widget){
			 var temp=Ext.ComponentQuery.query('#partneradvancesearchWindowItemId')[0];
			 temp.destroy();
			 var grid=this.getView();
			   	var store = grid.store;
				store.clearFilter();
				widget.setVisible(false);
				var temp=grid.down('#advancesearchbutton');
			    temp.enable();
		},
		getQuickSearchResults:function(cmp){
			var store=this.getView().store;
			   var value=cmp.getValue();
			   if(value!=null && value!=''){
		       store.proxy.setFilterParam('query');
		       var parameters='{"partnerName":"'+value+'"}';
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
			   var createpartner=Ext.ComponentQuery.query("#createpartnerItemId")[0];
			   createpartner.down('#messageFieldItemId').setValue('').setVisible(true);
			   createpartner.down('#messageFieldItemId').setHidden('true');
			   
		   },
		   notifyByMessage:function()
		    {
			   var partnersearch=Ext.ComponentQuery.query('#partneradvancesearchWindowItemId')[0];
			   partnersearch.down('#messageFieldItemId').setValue('').setVisible(true);
			   partnersearch.down('#messageFieldItemId').setHidden('true');
		    }
});