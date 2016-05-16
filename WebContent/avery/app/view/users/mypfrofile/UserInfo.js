Ext.define('AOC.view.users.myprofile.UserInfo', {
    extend: 'Ext.form.Panel',
    requires : [
        'Ext.form.field.Hidden'
    ],
    alias: 'widget.userinfo',
    padding: '30 20 30 20',
    initComponent: function () {
        Ext.apply(this, {
            items: this.buildItems()
        });
        this.callParent(arguments);
    },
    listeners:{
	afterrender : function(cmp){
	     cmp.updateLayout();
	}
    },
    buildItems: function () {
        var me = this,
            imageUrl,
            userGender,
            settings = AOC.config.Settings,
            runtime=AOC.config.Runtime,
            userImageHtml = '';
        if(me.rec){
            imageUrl = me.rec.get('imageUrl');
            userGender = me.rec.get('gender');
        }
        else{
              imageUrl = runtime.getUser().imageUrl;
              userGender = runtime.getUser().gender;
        	}
        if(Ext.isEmpty(imageUrl))
            imageUrl= settings.buttonIcons.defaultUserImg,
	    userImageHtml ='<img class="profile-img-inner-div" id="viewformImg" src="'+ imageUrl+'?_dc='+new Date().getTime()+'"/>';
        return [{
            xtype: 'container',
            itemId: 'userdetaildisplay',
            layout: {
                type: 'hbox'
            },
            height: (!Ext.isEmpty(me.rec)) ? 295 :350,
            items: [{
                xtype: 'component',
                itemId: 'imgComponent',
                html: '<div class="container-border profile-img-outer-div" id="userimg">'+userImageHtml+'</div>',
                margin: '0 100 0 200'
            }, {
                xtype: 'form',
                margin : '0 0 0 0',
                itemId: 'userinfoform',
                layout: {
                    type: 'vbox'
                },
                defaults: {
                    xtype: 'displayfield',
                    fieldCls       : 'profile-info-field',
                    cls    : 'profile-info-form-item',
                    labelClsExtra       : 'profile-info-field-lbl',
                    labelWidth: 200,
                    labelSeparator: ' '
                },
                items: [{
                    fieldLabel: name,
                    name: 'name',
                    itemId: 'name',
                    renderer : function(v){
                    	var html='<span class="user-info-name-wrap">'+Ext.util.Format.htmlEncode(v)+'</span>';
                    	return v;
                    }
                },{
                    fieldLabel:AOCLit.iam,
                    name: 'gender',
                    itemId: 'gender',
                    renderer : function(v){
                    	return Ext.util.Format.htmlEncode(v);
                    }
                }, {
                    fieldLabel:AOCLit.emailAddress,
                    name: 'email',
                    itemId: 'email',
                    renderer : function(v){
                    	return Ext.util.Format.htmlEncode(v);
                    }
                },{
                    fieldLabel: AOCLit.jobTitle,
                    name: 'jobTitle',
                    itemId: 'jobTitle',
                    renderer : function(v){
                    	return Ext.util.Format.htmlEncode(v);
                    }
                },{
                    fieldLabel: AOCLit.role,
                    name: 'role',
                    itemId: 'role',
                    renderer : function(v){
                    	return Ext.util.Format.htmlEncode(v);
                    }
                },{
                    xtype: 'hiddenfield',
                    name: 'id'
                }]
            }]

        }];
    },
    buildAddMarkup: function (imageUrl) {
        var me = this,
            t = '<div class="container-border profile-img-change-outer-div" id="userchangeimg"><img class="container-border profile-img-inner-div" src="'+applicationContext+'/' + imageUrl + '"/>' +
                '<div class="container-border profile-img-change-action-div entityactionbar-add-wrapper">' +
                '<span class="profile-change-pic ">Change Picture</span>' +
                '<span class="ai-circle-add profile-change-circle"></span>' +
                '</div> </div>';
        return Ext.String.format(t);
    }
});