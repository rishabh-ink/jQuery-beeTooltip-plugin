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
      initialize: function(userOptions, tooltipParent) {
         this.options = $.extend({}, $.fn.beeTooltip.options, userOptions);
         this.tooltipParent = tooltipParent;

         this.tooltipParent.on("mouseover", $.proxy(this.bringUp, this));
         this.tooltipParent.on("mouseout", $.proxy(this.bringDown, this));

         this.manageTitleAttribute();

         return this;
      },

      bringUp: function() {
         console.log("BeeTooltip.create(), this", this);
         this.tooltipContainer = $(document.createElement("div"))
                        .hide()
                     .addClass("beeTooltip-container")
                  .text(this.tooltipParent.attr("data-original-title"))
               .appendTo(this.tooltipParent)
            .stop()
         .show("fast");
      },

      bringDown: function() {
         var self = this;

         console.log("BeeTooltip.bringDown(), this", this);

         self.tooltipContainer.hide("fast", function() {
            self.tooltipContainer.detach();
         });
      },

      manageTitleAttribute: function() {
         var tpParent = this.tooltipParent;

         if (tpParent.attr("title") || typeof(tpParent.attr("data-original-title")) != "string") {
           tpParent.attr("data-original-title", tpParent.attr("title") || "").removeAttr("title");
         }
      }
   };

   $.fn.beeTooltip = function(userOptions) {
      console.log("$.fn.beeTooltip()", {
         "this": this
      });

      return this.each(function() {
         var tooltipParent = $(this),
             beeTooltip = Object.create(BeeTooltip);

         // Tooltips are only for elements having a `title` attribute.
         if(null !== tooltipParent.attr("title")) {
            beeTooltip.initialize(userOptions, tooltipParent);
         }
      });
   };

   $.fn.beeTooltip.options = {
      effect: "slide"
   };

})(jQuery, window, document);