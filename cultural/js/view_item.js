//JSONP version
//we get a json array and manipulate it.
function getItemJSONP(itemID)
{
    
    urlTemp = "http://collections.natural-europe.eu/repository/api/ariadne/restp?json=%7B%22clause%22%3A%20%5B%7B%22language%22%3A%20%22VSQL%22%2C%20%22expression%22%3A%20%22"+itemID+"%22%7D%5D%2C%20%22resultInfo%22%3A%20%22display%22%2C%20%22resultListOffset%22%3A%200%2C%20%22resultListSize%22%3A%206%2C%20%22idListOffset%22%3A%200%2C%20%22uiLanguage%22%3A%20%22en%22%2C%20%22facets%22%3A%20%5B%22provider%22%2C%20%22language%22%2C%20%22format%22%2C%20%22classification%22%5D%2C%20%22idListSize%22%3A%206%2C%20%22resultFormat%22%3A%20%22json%22%2C%20%22resultSortkey%22%3A%20%22%22%7D&engine=InMemory";
    //alert(urlTemp);
    
    jQuery.ajax({
                url: urlTemp,
                dataType: "jsonp",
                success: function(data)
                {
                
                
                
                //parse array and create a JS Object Array
                //every item is a JSON
                var thisJson = JSON.stringify(data);
                var tmp = JSON.parse(thisJson);
                var record = tmp.result.metadata[0];
                
                console.log(record);
                
                //left_sidebar
                
                //-//collection
                if(record.collectionId!=undefined)
                {
	                document.getElementById('collection').innerHTML = record.collectionId;
                }
                
                //-//classification
                if(record.classification!=undefined)
                {
	                var tempClassif = Object.keys(record.classification);
	                if(tempClassif.length>0)
	                {
		                for(var i=0; i <tempClassif.length; i++)
		                {
			                if(record.classification[tempClassif[i]]!=undefined)
			                {
				                jQuery('#classification').append(record.classification[tempClassif[i]] );
			                
				                if(i!=tempClassif.length-1)
				                {jQuery('#classification').append(", ");}
			                }
		                }
	                }
	                
                }
                
                //-//Scientific Name
                if(record.scientificName!=undefined)
                {
                	if(record.scientificName instanceof Object)
                	{
	                	var tempScienName = Object.keys(record.scientificName);
		                if(tempScienName.length>0)
		                {
				            for(var i=0; i <tempScienName.length; i++)
			                {
				                if(record.classification!=undefined && record.classification[tempScienName[i]]!=undefined)
				                {
					                jQuery('#scientific_name').append(record.scientificName[tempScienName[i]].value);
					                if(i!=tempScienName.length-1)
					                { jQuery('#scientific_name').append(", "); }
				                }
			                }  
		                }
                	}
                	else
                	{
	                	jQuery('#scientific_name').append(record.scientificName);
                	}
	                
	                
                }
                
                //-//Spatial Coverage
                if(record.spatial!=undefined)
                {
	                var tempSpatial = Object.keys(record.spatial);
	                for(var i=0; i <tempSpatial.length; i++)
	                {
		                var tempInSpatial =  Object.keys(record.spatial[i]);
		                for(var j=0; j<tempInSpatial.length;j++)
		                {
			                if(record.spatial[tempSpatial[i]][tempInSpatial[j]]!=undefined)
			                {
				                jQuery('#spatial_coverage').append(record.spatial[tempSpatial[i]][tempInSpatial[j]]);
				                if(j!=tempInSpatial.length-1)
				                { jQuery('#spatial_coverage').append(", "); }
			                }
		                }
	                }
                }
                
                //-//date created
                if(record.created!=undefined)
                {
                	if (record.created instanceof Object == true) 
                	{
                	  var thisDate = record.created[0].value;
					  jQuery('#date_created').append(thisDate);
					}
					else
					{
						console.log(record.created);
						jQuery('#date_created').append(record.created);
					}
                	
	                
                }
                
                
                
                //-//type
                if(record.type!=undefined)
                {
	                var tempType = Object.keys(record.type);
	                for(var i=0; i <tempType.length; i++)
	                {
		                if(record.type[tempType[i]]!=undefined){
		                jQuery('#type').append(record.type[tempType[i]].value);
		                if(i!=tempType.length-1){ jQuery('#type').append(", "); }
		                }
	                }
                }
                
                
                
                
                //--//content-type
                document.getElementById('media_type').innerHTML = record.contentType;
                
                
                //-//-// generate_thumb
                if(record.contentType.toUpperCase() == "IMAGE")
                {
	                jQuery('#itemThumb').append("<a href=\""+record.thumbnailUri+"\" target=\"_blank\"><img src=\""+record.thumbnailUri+"\" /></a>");
                }
                else
                {
	                jQuery('#itemThumb').append("<img src=\"images/no-image.gif\" />");
                }
                
                
                //-------------------------------------------item description (CENTRAL BOX)
                //-//item title
                if(record.title)
                {
	                var tempTitle = Object.keys(record.title);
	                for(var i=0; i<tempTitle.length;i++)
	                {
		                if(record.title[tempTitle[i]].lang =='en'){
		                jQuery('#item_title').append('<a class="item_title_link" href=\"'+record.objectUri+'\" target=\"_blank\">'+record.title[tempTitle[i]].value+'</a>');
	                }
	                }
                }
                
                //-//item description
                if(record.description!=undefined)
                {
	                var tempDesc = Object.keys(record.description);
	                for(var i=0; i<tempTitle.length;i++)
	                {
		                if(record.description[tempDesc[i]].lang =='en'){
		                jQuery('#item_description').append(record.description[tempDesc[i]].value);
		                }
	                }
                }
                
                
                //-//item_creator
                if(record.creator!=undefined)
                {
	                var tempCreator = Object.keys(record.creator);
	                for(var i=0; i <tempCreator.length; i++)
	                {
		                if(record.creator[i].value!=undefined)
		                {
			                if(record.creator[i].lang='en')
			                {
				                jQuery('#item_creator').append(record.creator[i].value);
				                if(i!=tempCreator.length-1)
				                { jQuery('#item_creator').append(", "); }
			                }
		                }
	                }
                }
                
                
                //-//item_keywords
                //var tempKeywords = Object.keys(record.subject);
                if(record.subject!=undefined){
                for(var i=0; i <record.subject.length; i++)
                {
	                if(record.subject[i].value!=undefined){
		                if(record.subject[i].lang='en')
		                {
			                jQuery('#item_keywords').append(record.subject[i].value);
			                if(i!=record.subject.length-1)
			                { jQuery('#item_keywords').append(", "); }
		                }
	                }
                }
                }
                
                //-//language
                if(record.Languages!=undefined)
                {
	                jQuery('#item_language').append('<span class=\"flag '+record.Languages[0]+'flag\">'+record.Languages[0]+'</span>');
                }
                
                
                //-//Copyrights
                document.getElementById('item_copyrights').innerHTML = record.rights ;
                
                
                //-//Creative Common License
                //document.getElementById('item_common_license').innerHTML = record.licenseUri ;
                ////
                if(record.licenseUri.search("licenses/by-nc-sa")>=0)
                {
	                jQuery('#item_common_license').append('<nav  class="itemRights"><a href="'+record.licenseUri+'" class="secondary" target="_blank"><img style="display:inline;" src="images/cc/cc-by-nc-sa.png"></a></nav>');
                }
                else if(record.licenseUri.search("licenses/by-nc-nd")>=0){
	                jQuery('#item_common_license').append('<nav  class="itemRights"><a href="'+record.licenseUri+'" class="secondary" target="_blank"><img style="display:inline;" src="images/cc/cc-by-nc-nd.png"></a></nav>');
                }
                else if(record.licenseUri.search("licenses/by-nd")>=0){
	                jQuery('#item_common_license').append('<nav  class="itemRights"><a href="'+record.licenseUri+'" class="secondary" target="_blank"><img style="display:inline;" src="images/cc/cc-by-nd.png"></a></nav>');
                }
                else if(record.licenseUri.search("licenses/by-sa")>=0){
	                jQuery('#item_common_license').append('<nav  class="itemRights"><a href="'+record.licenseUri+'" class="secondary" target="_blank"><img style="display:inline;" src="images/cc/cc-by-sa.png"></a></nav>');
                }
                else if(record.licenseUri.search("licenses/by-nc")>=0){
	                jQuery('#item_common_license').append('<nav  class="itemRights"><a href="'+record.licenseUri+'" class="secondary" target="_blank"><img style="display:inline;" src="images/cc/cc-by-nc.png"></a></nav>');
                }
                else if(record.licenseUri.search("licenses/by")>=0){
	                jQuery('#item_common_license').append('<nav  class="itemRights"><a href="'+record.licenseUri+'" class="secondary" target="_blank"><img style="display:inline;" src="images/cc/cc-by.png"></a></nav>');
                
                }
                else{
	                jQuery('#item_common_license').append('<span>Rights: </span><nav  class="itemRights"><a href="'+record.licenseUri+'" class="secondary" target="_blank">'+record.licenseUri+'</a></nav>');
                }
                ////
                //-//Relation
                document.getElementById('item_relation').innerHTML = record.relation ;
                
                
                ///----Access to the resource
                
                if(record.objectUri!==undefined)
                {
	                jQuery('#itemAccess').append('<a target="_blank" href="'+record.objectUri+'" class="access  secondary">Access to the resource</a>');
                }
                
                
                
                //end of -success- of getItemJSONP
                }})}


// ADD THE LINK TO THE BANNER IMAGES
function imageClick(url) {window.location = url;}

