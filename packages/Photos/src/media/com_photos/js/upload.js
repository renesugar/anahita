/**
 * Author: Rastin Mehr
 * Email: rastin@anahitapolis.com
 * Copyright 2015 rmdStudio Inc. www.rmdStudio.com
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

;(function($, window) {
    
    'use strict';
    
    Dropzone.autoDiscover = false;
    
    $.widget('photos.upload',{
    	    	
    	_create : function(){
    		
    		var self = this;
    		this.uploadedPhotoIds = [];
    		
    		var dropzoneOptions = {
    				sending: function(file, xhr, data) {
    					var access = $(this.element).find('select[name="access"]').val();
    					data.append("access", access);
    				},
    				
    				success : function ( file, obj, xhr ){
    					self.uploadedPhotoIds.push(obj.id);
    				},
    				
    				queuecomplete : function(){

    					var url = self.options.setsUrl;
    					
    					$.each(self.uploadedPhotoIds, function(index, value){
    						url += '&photo_id[]=' + value;
    						});

    					$.get(url, function ( response ){
    						$(self.element).html(response);
    					});
    				}
    			};
    		
    		dropzoneOptions = $.extend({}, this.options, dropzoneOptions);
    		
    		this.dropzone = new Dropzone(this.options.filedrop, dropzoneOptions);
    		
    		//upload photos
    		this._on(this.element, {
    			'click [data-trigger="UploadPhotos"]' : function ( event ) {
    				event.preventDefault();
    				this.dropzone.enqueueFiles(this.dropzone.getFilesWithStatus(Dropzone.ADDED));
    			} 
    		});
    		
    		//remove photos
    		this._on(this.element, {
    			'click [data-trigger="RemovePhotos"]' : function ( event ) {
    				event.preventDefault();
    				this.dropzone.removeAllFiles(true);
    			} 
    		});
    	}
    });

}(jQuery, window));    