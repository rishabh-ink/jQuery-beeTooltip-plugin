(function ($, window, document, undefined) {
   "use strict";

   $(document).ready(function() {
      $("[title]").beeTooltip();

      $("#beeTooltip-show").on("click", function(event) {
         $("#tooltip-trigger").beeTooltip("show");

         event.preventDefault();
      });

      $("#beeTooltip-hide").on("click", function(event) {
         $("#tooltip-trigger").beeTooltip("hide");

         event.preventDefault();
      });
   });

})(jQuery, window, document);