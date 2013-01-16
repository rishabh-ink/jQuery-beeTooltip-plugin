(function ($, window, document, undefined) {
   "use strict";

   $(document).ready(function() {
      hljs.initHighlighting();
      
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