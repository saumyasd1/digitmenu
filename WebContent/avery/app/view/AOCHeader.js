Ext.define('AOC.view.AOCHeader',{
    extend : 'Ext.Component',
    alias : 'widget.aocheader',
    height : 60,
    cls : 'intake-header',
    requires : ['AOC.config.Settings'],
    initComponent : function(){
        Ext.apply(this,{
            html : this.buildMarkup()
        });
    },
    buildMarkup : function(){
    	var me=this;
   	        this.userButtonId = Ext.id();
   	        this.helpButtonId = Ext.id();
   	    
     	var div= '<img src="'+AOC.config.Settings.buttonIcons.aocHeader+'"/>'+
        '<div class="adeptia-header-buttons">'+
        '<div class="button" id="' + this.userButtonId + '"></div>'+
        '<div class="button" id="' + this.helpButtonId + '"></div>'+
    '</div>';
//         Ext.create('Ext.button.Button',{
//             text :displayuserName,
//             textAlign:'right',
//             tooltip:tooltip,
//             width:width,
//             ui : 'adeptiaheaderbuttons',
//             itemId : 'headeruserbutton',
//             renderTo : me.userButtonId,
//             //icon : PowerPay.config.Settings.buttonIcons.activeUser,
//             menu: [{
//                 text: 'Logout',
//                 action :'openPopupForHeader',
//                 itemId : 'logOutId',
//                 data:'Logout'
//             }]
//         });
   	     
   	     return div;
   	    }

});