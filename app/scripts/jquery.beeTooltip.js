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
      }
   };

   $.fn.beeTooltip = function(userOptions) {

      return this.each(function() {
         var beeTooltip = Object.create(BeeTooltip);

         beeTooltip.initialize(userOptions);
         // Do your stuff here.
      });

      $.fn.beeTooltip.options = {
         effect: "slide"
      };
   };

})(jQuery, window, document);