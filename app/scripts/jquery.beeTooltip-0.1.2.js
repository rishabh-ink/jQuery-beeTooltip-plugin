/*
jQuery.beeTooltip plugin
v0.1.1 - http://rishabhsrao.github.com/jquery-beetooltip-plugin
A jQuery plugin to show tooltips on hover.
*/
(function($, window, document, undefined) {
   "use strict";

   // Polyfill for Object.create().
   // See https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create
   if (typeof Object.create !== "function") {
      Object.create = function(obj) {
         function F() {}
         F.prototype = obj;
         return new F();
      };
   }

   var BeeTooltip = {
      constants: {
         dataIndicator: "beeTooltip-shown"
      },

      initialize: function(userOptions, tooltipParent) {

         var self = this;

         self.tooltipParent = tooltipParent;

         self.tooltipParent.css({
            "position": "relative"
         });

         self.moveTitleAttribute();

         switch(typeof userOptions) {
            case "object": {
               self.options = $.extend({}, $.fn.beeTooltip.options, userOptions);
               break;
            }

            case "string": {
               self.options = $.fn.beeTooltip.options;

               switch(userOptions) {
                  case "show": {
                     self.show.call(self);
                     break;
                  }

                  case "hide": {
                     self.hide.call(self);
                     break;
                  }

                  default: {
                     break;
                  }
               }

               break;
            }

            default: {
               self.options = $.fn.beeTooltip.options;
               break;
            }
         }

         self.tooltipParent.on("mouseenter", $.proxy(self.show, self));
         self.tooltipParent.on("mouseout", $.proxy(self.hide, self));

         return this;
      },

      show: function() {
         var self = this;

         // Proceed only if the tooltip is not already shown by a previous method call.
         if(!(self.tooltipParent.data(self.constants.dataIndicator))) {
            // Not a previously detached element, so create a new one.
            self.tooltipContainer = $(document.createElement("div"))
               .hide()
            .addClass(self.options.containerClass);

            // Tooltip arrow element.
            $(document.createElement("span"))
               .addClass("beeTooltip-arrow")
            .appendTo(self.tooltipContainer);

            // Tooltip content element.
            $(document.createElement("span"))
                  .addClass(self.options.contentClass)
               .text(self.tooltipParent.attr("data-original-title"))
            .appendTo(self.tooltipContainer);

            self.tooltipContainer
               .appendTo(self.tooltipParent)
            .show("fade", self.options.effectSpeed);

            // Setup a flag indicating that the tooltip is now shown.
            self.tooltipParent.eq(0).data(self.constants.dataIndicator, true);
         }
      },

      hide: function() {
         var self = this;

         // Detach the element only if the tooltip is visible.
         if(true === self.tooltipParent.data(self.constants.dataIndicator)) {
            // If `hide()` was called via the JavaScript API, then `tooltipContainer` is `undefined`.
            if("undefined" === typeof (self.tooltipContainer)) {
               self.tooltipContainer = self.tooltipParent.find("." + $.fn.beeTooltip.options);
            }

            self.tooltipContainer.hide("fade", this.options.effectSpeed, function() {
               self.tooltipContainer.detach();
            });

            // Setup a flag indicating that the tooltip is now hidden.
            self.tooltipParent.data(self.constants.dataIndicator, false);
         }
      },

      // Moves the title attribute to data-original-title attribute.
      // Courtesy https://github.com/twitter/bootstrap/blob/master/js/bootstrap-tooltip.js#L185
      moveTitleAttribute: function() {
         var tpParent = this.tooltipParent;

         if (tpParent.attr("title") || typeof(tpParent.attr("data-original-title")) !== "string") {
           tpParent.attr("data-original-title", tpParent.attr("title") || "").removeAttr("title");
         }
      }
   };

   $.fn.beeTooltip = function(userOptions) {
      return this.each(function(index, value) {
         var tooltipParent = $(value),
             beeTooltip = Object.create(BeeTooltip);

         // Tooltips are only for elements having a `title` attribute.
         if(null !== tooltipParent.attr("title")) {
            beeTooltip.initialize(userOptions, tooltipParent);
         }
      });
   };

   $.fn.beeTooltip.options = {
      effectSpeed: "normal", // The jQuery animation effect speed.
      containerClass: "beeTooltip-container", // The class to add to the tooltip container.
      contentClass: "beeTooltip-content" // The class to add to the tooltip text content.
   };

})(jQuery, window, document);