(function($, window, document, undefined) {
   "use strict";

   // Polyfill for Object.create().
   // See https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create
   if (typeof Object.create !== "function") {
      Object.create = function(obj) {
         function F() {};
         F.prototype = obj;
         return new F();
      };
   }

   var BeeTooltip = {
      initialize: function(userOptions, element) {
         var self = this;

         // Merge plugin options.
         self.options = $.extend({}, $.fn.beeTooltip.options, userOptions);

         self.element = element;

         // Create the HTML structure for the plugin.
         self.createStructure();
      },

      createStructure: function() {
         var self = this,
             $element = $(self.element);

         var el = $(document.createElement("span"))
               .addClass("beeTooltip-container")
            .text($element.attr("title"))
         .appendTo($element);

         console.log("BeeTooltip.createStructure(): Created element", {
            el: el
         });
      }
   };

   $.fn.beeTooltip = function(userOptions) {
      console.log("$.fn.beeTooltip()", {
         "this": this
      });

      return this.each(function() {
         var $element = $(this),
             beeTooltip = Object.create(BeeTooltip);

         // Tooltips are only for elements having a `title` attribute.
         if(null === $element.attr("title")) {
            return false; // So skip the ones without it.
         }

         beeTooltip.initialize(userOptions, $element);
      });
   };

   $.fn.beeTooltip.options = {
      effect: "slide"
   };

})(jQuery, window, document);