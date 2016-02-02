Ext.define('AOC.config.Overrides',{
    singleton : true,
    constructor : function(){
    		 Ext.override(Ext.form.field.Base,{
    	            initComponent : function(){
    	                var fl = this.fieldLabel,
    	                    ab = this.allowBlank;
    	                if (ab === false && fl) {
    	                    this.fieldLabel = '<span style="color:#EB4A00;">*</span> '+fl;
    	                } else if (ab === true && fl) {
    	                    this.fieldLabel = '  '+fl;
    	                }
    	                this.callParent(arguments);
    	            }
    	        });
    }
    
});