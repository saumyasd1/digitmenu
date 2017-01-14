Ext.define('AOC.view.taskmanager.AssignCSRController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.assigncsrwindow',
    runTime: AOC.config.Runtime,
    
    onSaveBtnClicked:function(btn){
    	 var view = this.getView(),
	   		ref = this.getReferences(),
	   		csrCombo = ref.csrCombo,
	   		obj,
	   		
   		comboValue = csrCombo.getValue();
    	 if(comboValue){
	    	Ext.Msg.show({
	    	      title:'Assign CSR',
	    	      message: 'Are you sure you want to move the email to task manager?',
	    	      buttons: Ext.Msg.YESNO,
	    	      icon: Ext.Msg.QUESTION,
	    	      fn: function(btn) {
	    	          if (btn === 'yes') {
		    	      		obj = {
		    	      			name:csrCombo.getRawValue(),
		    	      			assignCSRId:csrCombo.getValue(),
		    	      			recordId:view.recordId
		    	      		};
		    	      	if(Ext.isFunction(view.callback)){
		    	      		view.callback.call(this, obj);
		    	      	}
	    	          } 
	    	      }
	    	  });
	    }
	else{
		Ext.Msg.alert(AOCLit.warningTitle,'Please select CSR');
		return ;
	}
    	
    }
});