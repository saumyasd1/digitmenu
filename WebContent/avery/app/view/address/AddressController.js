Ext.define('AOC.view.address.AddressController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.addressMain',
    requires : ['AOC.view.orderqueue.SalesOrderExpandableGrid','AOC.view.advsearch.AddressAdvanceSearch'],
    runTime : AOC.config.Runtime,
    getAddressBasedOnSearchParameters: function() {
		 	var valueObj=this.getView().getForm().getValues(false,true);
		 	var FromDate=valueObj.fromDate;
		 	var ToDate=valueObj.toDate;
		 	if(FromDate<=ToDate)
		 		{
	    	if(!valueObj.hasOwnProperty('datecriteriavalue'))
	    		valueObj.datecriteriavalue='createdDate';
			var parameters=Ext.JSON.encode(valueObj);
	    	var grid=this.runTime.getActiveGrid();
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
				    var addresssearch=Ext.ComponentQuery.query('#addressAdvancedSerachwindow')[0];
				        addresssearch.down('#messageFieldItemId').setValue('<center><font color=red>From Date must be less than or equal to To Date</font></center>').setVisible(true);
		 		 }
		},
		clearAdvancedSerach:function(widget){
			 var temp=Ext.ComponentQuery.query('#addressAdvancedSerachwindow')[0];
			
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
	openAdvancedSearchWindow:function(cmp,event){
		var temp=Ext.ComponentQuery.query('#addressAdvancedSerachwindow')[0];
		 if(!temp){
				 temp = Ext.create('Ext.window.Window',{
						 	height:270,
							width:420,
							title:advancedSearchWindowTitle,
							itemId:'addressAdvancedSerachwindow',
							layout: 'fit',
							draggable: false,
							modal:true,
						 	listeners:{ 
					             beforedestroy: function(btn) {
						 		 cmp.enable();
						 	}
				        },
						 	items : [{  xtype : 'addressadvancesearch' }]
					 });
		         }
					if (Ext.isIE || Ext.isGecko) {
						browser = "IE";
						 var d = Ext.get(event.getTarget());
						 var width = temp.width;
						 width=width-25; 
						 x=d.getX();
						 y=d.getY();
						//box = this.getBox();
	   	        		temp.showAt(x-width,y+26);
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
	openAddAddressWindow:function(currentRecord,id){
		var mode=this.runTime.getWindowInEditMode();
		var win=Ext.ComponentQuery.query('#createaddressmanageItemId')[0];
		var title=mode ?'Edit Address':'Add Address';
		if(!win){
		    var data={"id":""};
		    win=Ext.create('AOC.view.address.AddAddress',{
			modal:true,
			title:title,
			rec:currentRecord,
			editMode:mode,
			ID:id
		});
		win.show();
		}
	},
	saveAddressDetails:function(){
		Ext.getBody().mask('Saving....');
		var me=this;
		var Msg='';
		var createaddress=this.getView();
		var panel=createaddress.down('#listPanel');
		var valueObj='',form=this.getView().down('form');
		var editMode=this.getView().editMode,url='';
		var methodMode='';
		var length=0;
		if(editMode){
			ID=createaddress.ID;
			url=applicationContext+'/rest/address/'+ID;
			form.updateRecord();
			methodMode='PUT';
			valueObj=form.getRecord().getChanges() ;
			length=Object.keys(valueObj).length;
			Msg='<b>Address Updated Successfully</b>';
			var parameters=Ext.JSON.encode(valueObj);
		}
		else{
			url=applicationContext+'/rest/address';
			valueObj=form.getValues(false,true,false,true);
			methodMode='POST';
			length=1;
			Msg='<b>Address Added Successfully</b>';
			var parameters={
					orgCode:valueObj.orgCode,
					partnerName:valueObj.partnerName,
					siteNumber:valueObj.siteNumber,
					description:valueObj.description,
					address1:valueObj.address1,
					address2:valueObj.address2,
					address3:valueObj.address3,
					address4:valueObj.address4,
					address:valueObj.address,
					city:valueObj.city,
					state:valueObj.state,
					country:valueObj.country,
					zip:valueObj.zip,
					contact:valueObj.contact,
					phone1:valueObj.phone1,
					phone2:valueObj.phone2,
					fax:valueObj.fax,
					email:valueObj.email,
					shippingMethod:valueObj.shippingMethod,
					freightTerms:valueObj.freightTerms,
					shippingInstructions:valueObj.shippingInstructions,
					siteType:valueObj.siteType,
					partner:{id:valueObj.partner_id}
		    	}
		}
	
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
		        	Ext.getBody().unmask();
		        	me.getView().destroy();
              }
      	});
		}else{
			if(createaddress.editMode)
				createaddress.setTitle('Edit Address<font size=2 color=red>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please fill valid entry in the field marked as <img src='+errorIcon+' width="15" height="15"></font>');
			else
				createaddress.setTitle('Add Address<font size=2 color=red>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please fill valid entry in the field marked as <img src='+errorIcon+' width="15" height="15"></font>');
		}
		this.runTime.setWindowInEditMode(false);
	}
	},
	showMenu : function(view,rowIndex,colIndex,item,e) {
		var me=this,currentRecord=e.record;;
			var menu=Ext.create('Ext.menu.Menu', {
    		    width: 100,
    		    margin: '0 0 10 0',
    		    items: [{
		    		        text: 'Edit',
		    		        handler:function()
		    		        { 
		    		        	var id=currentRecord.get('id');
		    		        	me.runTime.setWindowInEditMode(true);
		    		        	me.openAddAddressWindow(currentRecord,id);
		    		        }
	    		        },
    		            {
	    		        	text: 'Delete',
	    		        	handler:function(){
	    		        		me.deleteResource(currentRecord);
	    		        	}
    		           }]
    		});
    	menu.showAt(e.getXY());
	},
	closeWindow: function(){
		Ext.getBody().unmask();
		this.getView().destroy();
		this.runTime.setWindowInEditMode(false);
		this.runTime.getActiveGrid().store.load();
	},
	deleteResource:function(record){
		var ID=record.get('id');
		var me=this;
		Ext.Msg.confirm('Alert','<b>Are you sure you want to delete the Address?</b>',function(btn){
			  if(btn=='yes'){
					Ext.Ajax.request({
							method:'DELETE',
							url:applicationContext+'/rest/address/'+ID,
				        success : function(response, opts) {
							Ext.Msg.alert('Alert Message','<b>Address Deleted Succesfully</b>');
							me.runTime.getActiveGrid().store.load();
				        },
				        failure: function(response, opts) {
		                }
		        	});
			  }
		});
	}
});