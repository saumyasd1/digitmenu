Ext.define('AOC.view.partner.PartnerController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.partnerMain',
    runTime : AOC.config.Runtime,
    requires:['AOC.view.advsearch.PartnerAdvanceSearch'],
    SaveDetails:function(){
		Ext.getBody().mask('Saving....');
		var me=this;
		var Msg='';
		var createpartner=Ext.ComponentQuery.query("#createpartnerItemId")[0];
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
			Msg='<b>Partner Updated Successfully</b>';
		}
		else{
			url=applicationContext+'/rest/partners';
			valueObj=form.getValues(false,true,false,true);
			//valueObj.active=false;
			methodMode='POST';
			length=1;
			Msg='<b>Partner Added Successfully</b>';
		}
		var parameters=Ext.JSON.encode(valueObj);
		if(length>0){
			if(panel.getForm().isValid()){
				Ext.Ajax.request( {
					method: methodMode,
				    jsonData : parameters,	
				    url : url,
		        success : function(response, opts) {
			  			Ext.Msg.alert('Alert Message',Msg);
			  			Ext.getBody().unmask();
				  		me.runTime.getActiveGrid().store.load();
				  		me.getView().destroy();
		        },
		        failure: function(response, opts) {
		        	Msg=response.responseText;
		        	Msg=Msg.replace("Exception:"," ");
		        	Ext.Msg.alert('Alert Message',Msg);
		        	Ext.getBody().unmask();
		        	me.getView().destroy();
              }
      	});
		}
		else{
			if(createpartner.editMode)
				createpartner.setTitle('Edit Partner Configuration<font size=2 color=red>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please fill valid entry in the field marked as <img src='+errorIcon+' width="15" height="15"></font>');
			else
				createpartner.setTitle('Add Partner Configuration<font size=2 color=red>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please fill valid entry in the field marked as <img src='+errorIcon+' width="15" height="15"></font>');
		}
			
		this.runTime.setWindowInEditMode(false);
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
			modal:true,
			title:'Add Partner'
		});
		  win.show();
    }
	},
showmenu:function(view,rowIndex,colIndex,item,e){
	var runtime=this.runTime;
	var me=this;
	 {
			var menu=Ext.create('Ext.menu.Menu', {
 		    width: 180,
 		    margin: '0 0 5 0',
 		    items: [{
 		        text: 'Edit',
 		        handler:function()
		        {
		        	me.editpartnermanagement(view,rowIndex,colIndex,item,e);
		        }
 		    },{
 		        text: 'Delete',
 		        action:'deletepartner',
 				handler:function()
 				{  
	 					var data=e.record;
		     			var id=data.id;
	     			   Ext.MessageBox.confirm('Confirm Action', '<b>Are you sure,you want to delete this partner</b>', function(response) {
	     				  if (response == 'yes') {
	     						Ext.Ajax.request({
	     							method:'DELETE',
	     							url:applicationContext+'/rest/partners/'+id,
         				        success : function(response, opts) {
         							Ext.Msg.alert('Alert Message','<b>Partner Deleted Succesfully</b>');
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
 		    }
 		    ,{
 		        text: 'View ProductLine',
 		        action:'viewproductline',
 		        handler:function()
 		        { 
 		        	
 		        	var me=this;
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
 		        	var partnergrid=Ext.ComponentQuery.query('#partnertitleItemid')[0];
 		        	partnerproduct.partnerid=id;
 		        	partnerproduct.partnerName=partnerName;
 		        	partnerproduct.down('#pagingtoolbar').bindStore(store);
 		        	runtime.setActiveGrid(partnerproduct);
 		        	partnergrid.setText('<b>Partner Product Line-Manage</b>');
 		        }
 		    }]
 		});
 		
 	menu.showAt(e.getXY());
		}
},
	openAdvancedSearchWindow:function(cmp,event)
	{
	 var temp=Ext.ComponentQuery.query('#partneradvancesearchWindowItemId')[0];
	 if(!temp){
	
			 temp = Ext.create('Ext.window.Window',{
					 	height:250,
						width:420,
						title:advancedSearchWindowTitle,
						itemId:'partneradvancesearchWindowItemId',
						layout: 'fit',
						draggable: false,
						modal:true,
					 	listeners:{ 
				             beforedestroy: function(btn) {
					 		 cmp.enable();
					 	}
			        },
					 	items : [{  xtype : 'partneradvancesearch' }]
				 });
	         }
			 if (Ext.isIE || Ext.isGecko) {
		         browser = "IE";
		         var d = Ext.get(event.getTarget());
		         var width = temp.width; //width of advanced search panel
		        // box = this.getBox();
		         width = width - 25; //remove margin
		         x = d.getX();
		         y = d.getY();
		         temp.showAt(x - width, y + 26);
		     } 
				else if (Ext.isChrome || Ext.isSafari) {
					 browser = "Chrome";
					 var d = Ext.get(event.getTarget());
					 var width = temp.width;
					 width=width-24;
					 x=d.getX();
					 y=d.getY();
  	        		 temp.showAt(x-width,y+20);
				}
				return false;
		},
			getPartnerBasedOnSearchParameters: function() {
		 	var valueObj=this.getView().getForm().getValues(false,true);
		 	var FromDate=valueObj.fromDate;
		 	var ToDate=valueObj.toDate;
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
			 temp.close();
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
		   editpartnermanagement:function(view,rowIndex,colIndex,item,e)
		   {
			   var data=e.record;
	     		    	var win=Ext.ComponentQuery.query('#createpartnerItemId')[0];
		     			if(!win){
		     			    
		     			    var id=data.id;
		     			    var partnerName=data.get('PartnerName');
		     			    win=Ext.create('AOC.view.partner.CreatePartner',{
		     				modal:true,
		     				title:'Edit Partner',
		     			    editMode:true,
		     			    rec:data,
		     			    partnerId:id,
		     			    partnerName:partnerName
		     			});
	     			  win.show();
	     			}
		   }
});