var app = angular.module("autoCompleteApp",[]);

app.controller("autoCompleteController", function($scope){

});

app.directive("autocomplete",function($compile){
	var directive = {};
    directive.restrict = "A";
    
    directive.template = "";

    directive.compile = function(element, attributes) {

        var linkFunction = function($scope, element, attributes) {
			var id = attributes.id;

			element.bind("keyup", function (event) {
				
                var left = element.prop('offsetLeft')-8;
				angular.element(document.querySelector("#"+id+"searchedData")).remove();
				var input = element.val();
				if(input == null || input == "" || input == undefined)
					return false;
				
				var htmlData = "<div style='left:"+left+"px; position:relative;min-width:"+element.prop('offsetWidth')+"px;display:table' id='"+id+"searchedData'><ul style='margin-top:0;padding-left:0px;border:1px solid #bfbfbf; list-style-type:none'>";
				var arr = $scope.$eval(attributes.data);
				var count = 0;
				angular.forEach(arr, function(value, key) {
				  if(value.toLowerCase().indexOf(input.toLowerCase()) >= 0){
					 count++;
                     htmlData += "<li target="+id+" style='font-size:14px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;text-align:left;cursor:pointer;'>"+value+"</li>";
				  }
				});
				htmlData += "</ul></div>";
				var linkFn = $compile(htmlData);
				
                var content = linkFn($scope);
				if(count>0){
					element.after(content);
	
					angular.element(document.querySelector("#"+id+"searchedData ul")).find("li").bind("click", function($event){
					  var element = $event.target;
					  var v = angular.element(element)[0].innerText;
					  var t = angular.element(element)[0].attributes.target.nodeValue;
					  angular.element(document.querySelector("#"+t)).val(v);
					  angular.element(document.querySelector("#"+t+"searchedData")).remove();
					});

					angular.element(document.querySelector("#"+id+"searchedData ul")).find("li").bind("mouseover", function($event){
					  var element = $event.target;
					  angular.element(element).css("background-color","#b3d9ff");
					});
					angular.element(document.querySelector("#"+id+"searchedData ul")).find("li").bind("mouseout", function($event){
					  var element = $event.target;
					  angular.element(element).css("background-color","#fff");
					});
				}
				
            });
        }

        return linkFunction;
    }

    return directive;
});
