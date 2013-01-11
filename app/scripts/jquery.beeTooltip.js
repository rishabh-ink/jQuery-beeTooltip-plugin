(function($, window, undefined) {
   "use strict";

   $.fn.beeTooltip = function(userOptions) {
      console.log("$.fn.beeTooltip initialized.");
      $.fn.beeTooltip.defaults = {
         speed: 200,
         delay: 300
      };

      console.log("Merging defaults with options.", $.fn.beeTooltip.defaults, options);
      var options = $.extend($.fn.beeTooltip.defaults, userOptions);
   };

})(jQuery, window);