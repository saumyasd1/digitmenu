Ext.define('AOC.view.viewmail.ViewMailController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.viewMailController',
  
    runTime : AOC.config.Runtime,
    //emailGridRecordArray:[],
    
    onClickMenu: function(obj, rowIndex, colIndex, item, e, record) {
        var me = this;
        var callout = Ext.widget('callout', {
            cls: 'white more-menu-item-callout extra',
            html: me.buildMenuTpl.apply("{}"),
            target: e.target,
            calloutArrowLocation: 'top-left',
            relativePosition: 't-b',
            relativeOffsets: [52, 23],
            dismissDelay: 0,
            listeners: {
            	afterrender: me.onAfterRenderEditCallout,
        	    disregard: function(cmp) {}
            }
        });
        //Adding functionality related to Menu item visibility
        callout.show();
        var heightAbove = e.getY() - Ext.getBody().getScroll().top,
        heightBelow = Ext.Element.getViewportHeight() - heightAbove;
  	    if(heightBelow<(callout.getHeight()+40)){
  		  callout.calloutArrowLocation='bottom-left'; 
  		  callout.relativePosition='b-t';
  		  callout.relativeOffsets = [75, 0];
  	  }else{
  		  callout.calloutArrowLocation='top-left'; 
  		  callout.relativePosition='t-b';
  		callout.relativeOffsets = [75, 5];
  	  }
        callout.show();
    },
    
    onAfterRenderEditCallout: function(cmp) {
        var me = this;
        cmp.el.on({
            delegate: 'div.user-profile-menu-item',
            click: function(e, element) {
                var el = Ext.get(element),
                    event = el.getAttribute('event');
                if (event && !el.hasCls('edit-menu-disabled')) {
                    me.fireEvent(event);
                }
            }
        });
    },
    
    buildMenuTpl: function() {
        var me = this;
        return Ext.create('Ext.XTemplate',
            '<div style="width: 180px !important;border-bottom: none !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="disregard"">Disregard</div>',
            '</tpl>'
        );
    },
    
    backButton:function() {
	   var owner = this.getView().ownerCt;
	   if(owner.itemId=='emailPanel'){  		   
		   var panel=Ext.ComponentQuery.query('#emailPanel')[0];
		   var emailManagement=panel.down('#EmailMangementitemId');
	       panel.getLayout().setActiveItem(emailManagement);
	       emailManagement.getView().refresh();
	       emailManagement.getStore().load();
	   }
	   else if(owner.itemId=='taskManagerPanel'){  		   
		   var panel=Ext.ComponentQuery.query('#taskManagerPanel')[0];
		   var taskManager=panel.down('#TaskManagerGriditemId');
	       panel.getLayout().setActiveItem(taskManager);
	       taskManager.getView().refresh();	
	       taskManager.getStore().load();
	   }
  	},
  	
  	onSaveBtnClicked:function(btn){	
  		Ext.getBody().mask('Saving....');
  		var me = this,
  			gridView = me.getView().down('#EmailAttachmentInfoGriditemId')
  			editorPlugin = gridView.editingPlugin;
  		
  		if(editorPlugin.editing){
  			gridView.focus();
  		}
  		
  		var orderFlag = false,
  			len = gridView.emailGridRecordArray.length;
  		
  		for(var i=0; i<len; i++){
  			var rec = gridView.emailGridRecordArray[i];
  			if(rec.fileContentType == 'Order' && !rec.productLineId){
  				orderFlag = true;
  			}
  		}
  		
  		if(orderFlag){
  			Ext.Msg.alert(AOCLit.warningTitle,'Please select Partner Data Structure.');
  			Ext.getBody().unmask();
  		}
  		else{
			var parameters = Ext.JSON.encode({json:gridView.emailGridRecordArray});
	  		
	  		Ext.Ajax.request({
		        method: 'PUT',
		        jsonData: parameters,
		        url: applicationContext+'/rest/orderattachements/updateattachments',
		        success: function(response, opts) {
		           
		        	gridView.emailGridRecordArray = [];
		            Ext.getBody().unmask();
		            me.verifyIdentifiedDisregardRecords();
		            Ext.Msg.alert('Success', 'Current state saved successfully');
		            gridView.store.load();
		            
		        },
		        failure: function(response, opts) {
		            var msg = response.responseText;
		            msg = msg.replace("Exception:", " ");
		            Ext.Msg.alert('Alert Message', msg);
		            Ext.getBody().unmask();
		        }
		    });
  		}
  	},
  	
  	onDataStructureChange:function(combobox, newValue, eOpts){
  		 var dataStructureCombo = Ext.ComponentQuery.query('#dataStructureItemId')[0];
  		 var button = Ext.ComponentQuery.query('#processButton')[0];

  		 if(!Ext.isEmpty(newValue)) {
  			dataStructureCombo.setHidden(false).setDisabled(false);
  		    button.setHidden(true).setDisabled(true);
	    }
  		 else {
  			dataStructureCombo.setHidden(true).setDisabled(true);
  		    button.setHidden(true).setDisabled(true);
	    }
	},
	
	onProcessOrderBtnClicked:function(){
		var me = this;
		Ext.Msg.show({
		    title:'Process Order',
		    message: 'Are you sure, you want to process order?',
		    buttons: Ext.Msg.YESNO,
		    icon: Ext.Msg.QUESTION,
		    fn: function(btn) {
		        if (btn === 'yes') {
		        	var gridView = me.getView().down('#EmailAttachmentInfoGriditemId'),
						trackingId = gridView.trackingId,
						obj = {id:trackingId, status:gridView.isIdentifiedFlag ? AOCLit.identifiedStatus  :''};
				
					Ext.getBody().mask('Processing Order....');
					Ext.Ajax.request({
						method: 'PUT',
				        jsonData: Ext.JSON.encode(obj),
				        url: applicationContext+'/rest/emailqueue/identified/' +trackingId,
				        success: function(response, opts) {
				            var jsonString = Ext.JSON.decode(response.responseText);
				            Ext.getBody().unmask();
				            AOC.util.Helper.fadeoutMessage('Success','Order Proccessed successfully');
				            me.backButton();
				        },
				        failure: function(response, opts) {
				            var msg = response.responseText;
				            msg = msg.replace("Exception:", " ");
				            Ext.Msg.alert('Alert Message', msg);
				            Ext.getBody().unmask();
				        }
				    });
		        } 
		    }
		});
	},
	editEmailAttachmentGridColumn:function(editor, e){
		var me = this,
			record = e.record
			grid = editor.grid,
			obj = {
				productLineId:record.get('dataStructureNameId'), 
				id:record.get('id'),
				status:1,
				fileContentType:record.get('contentType')
			},
			len = grid.emailGridRecordArray.length;
		
		if(len == 0){
			grid.emailGridRecordArray.push(obj);
			return;
		}
		
		for(var i = 0; i < len; i++){
			if(grid.emailGridRecordArray[i].id == record.get('id')){
				grid.emailGridRecordArray[i].productLineId = record.get('dataStructureNameId');
				grid.emailGridRecordArray[i].fileContentType = record.get('contentType');
				return;
			}
		}
		
		grid.emailGridRecordArray.push(obj);
	},
	
	verifyIdentifiedDisregardRecords:function(){
		var me = this,
			gridView = me.getView().down('#EmailAttachmentInfoGriditemId'),
			store = gridView.store,
			refs = this.getReferences(),
			saveBtn = refs.saveEmailAttachmentBtn;
			downLoadAttachmentBtn = refs.downLoadAttachmentBtn,
			totalCount = store.getCount(),
			totalIdentifiedCount = 0,
			totalUnidentifiedCount = 0,
			totalDisregardCount = 0,
			totalAdditionalFile = 0;
		
		store.each(function(record){
			if(record.get('contentType') == 'Additional File'){
				totalAdditionalFile++;
			}
			if(record.get('status') == '8'){
				totalIdentifiedCount++;
			}else if(record.get('status') == '6'){
				totalUnidentifiedCount++;
			}else{
				totalDisregardCount++;
			}
		});
		
		if(totalCount > 0){
			saveBtn.setDisabled(false);
			downLoadAttachmentBtn.setDisabled(false);
			
			if(totalCount == totalAdditionalFile){
				gridView.isIdentifiedFlag = false;
				me.enableDisableProcessBtn(true);
				return;
			}
			if(totalCount == totalIdentifiedCount){
				gridView.isIdentifiedFlag = true;
			}
			if(totalCount == totalIdentifiedCount || (totalIdentifiedCount > 0 && totalCount == (totalIdentifiedCount + totalDisregardCount))){
				me.enableDisableProcessBtn(false);
			}else{
				gridView.isIdentifiedFlag = false;
				me.enableDisableProcessBtn(true);
			}
		}else{
			downLoadAttachmentBtn.setDisabled(true);
			saveBtn.setDisabled(true);
			me.enableDisableProcessBtn(true);
		}
		
		if(gridView.status == '5'){
			saveBtn.setDisabled(true);
			me.enableDisableProcessBtn(true);
		}else{
			saveBtn.setDisabled(totalCount > 0 ? false : true);
		}
	},
	
	enableDisableProcessBtn:function(showFlag){
		var refs = this.getReferences(),
			button = refs.processOrderBtn;
		button.setDisabled(showFlag);
	},
	
	onViewShow:function(){
		var me = this,
			gridView = me.getView().down('#EmailAttachmentInfoGriditemId'),
			store = gridView.store;
		
		store.on('load',function(){
			me.verifyIdentifiedDisregardRecords();
		});
	},
	
	onEmailAttachmentGridCellClick:function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts ){
		if(e.target.className=='emailAttachmentLink'){
			this.downLoadFile(record.get('filePath'), record.get('fileName'));
		}
	},
	
	downLoadFile:function(filePath, fileName){
		var form = Ext.create('Ext.form.Panel', { 
			standardSubmit: true,   
			url : applicationContext+'/rest/orderattachements/download/'+filePath +'/'+fileName
		});
		form.submit({
			method : 'GET'
		});
	},
	
	onDownloadAttachmentBtnClick:function(){
		var me = this,
			refs = me.getReferences(),
			gridView = refs.emailAttachmentInfoGrid,
			recordsArray = gridView.getSelectionModel().getSelection(),
			len = recordsArray.length;
		
		if(len > 0){
			for(var i=0;i<len;i++){
				me.downLoadFile(recordsArray[i].get('filePath'),recordsArray[i].get('fileName'));
			}
		}else{
			Ext.Msg.alert(AOCLit.warningTite, AOCLit.selectAttachmentFileMsg);
		}
	}
});
