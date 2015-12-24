(function ( $ ) {
 
	var interval;
	var paused = false;
	var methods = {
        init : function(options) {
			var settings = $.extend( {}, $.fn.fastreader.defaults, options );
			var node = this;
			createFastreaderHtml(settings.useFontAwesome);
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
        pause : function( ) { paused = !paused;togglePauseButton($("#fast-reader-buttons a.fast-reader-pause,#fast-reader-buttons a.fast-reader-play"));  },
        close : function( ) { clearInterval(interval);$("#fast-reader-overlay").fadeOut();togglePauseButton($("#fast-reader-buttons a.fast-reader-pause,#fast-reader-buttons a.fast-reader-play")); },
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
        useFontAwesome: false,
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
	
	function createFastreaderHtml(useFontAwesome) {
		var html = '<div id="fast-reader-overlay" class="jquery-fast-reader"><div id="fast-reader" class="jquery-fast-reader"><span id="fast-reader-text"></span><span id="fast-reader-buttons"><a href="" class="fast-reader-play">' + (useFontAwesome ? '<i class="fa fa-play"></i>' : '<span class="fast-reader-icon"></span>') + '</a><a href="#" class="fast-reader-close" >' + (useFontAwesome ? '<i class="fa fa-times"></i>' : '<span class="fast-reader-icon"></span>') + '</a></span></div></div>';
		if($("#fast-reader").length ==0) {
			$("body").append(html);
			$("#fast-reader-buttons a.fast-reader-pause, #fast-reader-buttons a.fast-reader-play").click(function(e) {
				e.preventDefault();
				$("#fast-reader").data("fast-reader-node").fastreader("pause");
			});
			$("#fast-reader-buttons a.fast-reader-close").click(function(e) {
				e.preventDefault();
				$("#fast-reader").data("fast-reader-node").fastreader("close");
			});
		}
	}
	
    function togglePauseButton(node) {
        var icon_node = node.find("i.fa");
        if(icon_node.hasClass("fa-pause")) {
            icon_node.removeClass("fa-pause");
            icon_node.addClass("fa-play");
        }else{
            icon_node.removeClass("fa-play");
            icon_node.addClass("fa-pause");
        }
        if(node.hasClass('fast-reader-play')) {
            node.removeClass('fast-reader-play');
            node.addClass('fast-reader-pause');
        }else{
            node.removeClass('fast-reader-pause');
            node.addClass('fast-reader-play');
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