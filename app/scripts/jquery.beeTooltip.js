(function($, window, document, undefined) {
   "use strict";

   if (typeof Object.create !== "function") {
      Object.create = function(obj) {
         function F() {};
         F.prototype = obj;
         return new F();
      };
   }

   var BeeTooltip = {
      initialize: function(userOptions) {
         var self = this;

         self.options = $.extend({}, $.fn.beeTooltip.options, userOptions);

         console.log("BeeTooltip.initialize()", {
            userOptions: userOptions,
            self: self,
            "$.fn.beeTooltip.options": $.fn.beeTooltip.options
         });

         console.log("$.fn.beeTooltip", {
            "$.fn.beeTooltip": $.fn.beeTooltip
         });
      }
   };

   $.fn.beeTooltip = function(userOptions) {
      console.log("$.fn.beeTooltip()", {
         "this": this
      });

      return this.each(function() {
         var beeTooltip = Object.create(BeeTooltip);

         beeTooltip.initialize(userOptions);
         // Do your stuff here.
      });
   };

   $.fn.beeTooltip.options = {
      effect: "slide"
   };

})(jQuery, window, document);