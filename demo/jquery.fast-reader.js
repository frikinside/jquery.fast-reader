(function ( $ ) {
 
	var interval;
	var paused = false;
	var methods = {
        init : function(options) {
			var settings = $.extend( {}, $.fn.fastreader.defaults, options );
			var node = this;
			createFastreaderHtml();
			$("#fast-reader").data("fast-reader-node",node);
			
			var words = new Array();
			words = this.text().removePunctuation().split(" ");
			
			var word_counter = 0;
			$("#fast-reader #fast-reader-text").css("color",settings.color);
			$("#fast-reader #fast-reader-text").text("");
			
			if(!settings.autoplay){
				paused = true;
				$("#fast-reader #fast-reader-text").html(pivot(settings.readyText,settings.maxPivotLetterPos));
			}
			interval = setInterval(function(){
				if(word_counter == (words.length)){
					node.fastreader("close");
					console.log(node);
				} else {
					if(!paused) {
						$("#fast-reader #fast-reader-text").html(pivot(words[word_counter],settings.maxPivotLetterPos));
						word_counter++;
					}
				}
			},60000/settings.wpm);
			
			this.data("fast-reader-instance",interval);
			$("#fast-reader-overlay").fadeIn();
			
			return this;
        },
        pause : function( ) { paused = !paused;  },
        close : function( ) { clearInterval(interval);$("#fast-reader-overlay").fadeOut(); },
		destroy : function( ) { clearInterval(interval);$("#fast-reader-overlay").fadeOut();$("#fast-reader-overlay").remove(); }
    };
 
    $.fn.fastreader = function( methodOrOptions ) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jquery.fast-reader' );
        } 
    };
 
	$.fn.fastreader.defaults = {
		color: "black",
		autoplay: false,
		readyText: "Ready",
		maxPivotLetterPos: 5,
        wpm: 300 //wpd: Words Per Minute
	};
	
	// Find the pivot-character of the current word.
	function pivot(word,maxPivotLetterPos){
		var length = word.length;

		var bestLetter = 1 + Math.min(Math.floor((length-1)/4),maxPivotLetterPos);

		var start = '.'.repeat((11-bestLetter)) + word.slice(0, bestLetter-1).replace('.', '&#8226;');
		var middle = word.slice(bestLetter-1,bestLetter).replace('.', '&#8226;');
		var end = word.slice(bestLetter, length).replace('.', '&#8226;') + '.'.repeat((11-(word.length-bestLetter)));

		var result;
		
		result = start + "<span class='fast-reader-pivot'>" + middle + "</span>" + end;
		result = result.replace(/\./g, "<span class='invisible'>.</span>");
		return result;
	}
	
	function createFastreaderHtml() {
		var html = '<div id="fast-reader-overlay" class="jquery-fast-reader"><div id="fast-reader" class="jquery-fast-reader"><span id="fast-reader-text"></span><span id="fast-reader-buttons"><a href="" class="fast-reading-pause"><i class="fa fa-play"></i></a><a href="#" class="fast-reading-close" ><i class="fa fa-times"></i></a></span></div></div>';
		if($("#fast-reader").length ==0) {
			$("body").append(html);
			$("#fast-reader-buttons a.fast-reading-pause").click(function(e) {
				e.preventDefault();
				$("#fast-reader").data("fast-reader-node").fastreader("pause");
				var icon_node = $(this).find("i.fa");
				if(icon_node.hasClass("fa-pause")) {
					icon_node.removeClass("fa-pause");
					icon_node.addClass("fa-play");
				}else{
					icon_node.removeClass("fa-play");
					icon_node.addClass("fa-pause");
				}
			});
			$("#fast-reader-buttons a.fast-reading-close").click(function(e) {
				e.preventDefault();
				var icon_node = $("#fast-reader-buttons a.fast-reading-pause i.fa");
				if(icon_node.hasClass("fa-pause")) {
					icon_node.removeClass("fa-pause");
					icon_node.addClass("fa-play");
				}
				$("#fast-reader").data("fast-reader-node").fastreader("close");
			});
		}
	}
	
	/* UTILS */
	String.prototype.repeat = function( num ){
		if(num < 1){
			return new Array( Math.abs(num) + 1 ).join( this );
		}
		return new Array( num + 1 ).join( this );
	};
	
	String.prototype.removePunctuation = function( ){
		return this.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g," ").replace(/ {2,}/g, " ").trim();
	};
 
}( jQuery ));