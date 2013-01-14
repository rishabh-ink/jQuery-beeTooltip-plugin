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
                     console.log("Showing", self);
                     self.show.call(self);
                     break;
                  }

                  case "hide": {
                     console.log("Hiding", self);
                     self.hide.call(self);
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
         console.log("show(), this", this);
         if("undefined" === typeof (this.tooltipContainer)) {
            // Not a previously detached element, so create a new one.
            this.tooltipContainer = $(document.createElement("div"))
               .hide()
            .addClass(this.options.containerClass);

            // Tooltip arrow element.
            $(document.createElement("span"))
               .addClass("beeTooltip-arrow")
            .appendTo(this.tooltipContainer);

            // Tooltip content element.
            $(document.createElement("span"))
                  .addClass(this.options.contentClass)
               .text(this.tooltipParent.attr("data-original-title"))
            .appendTo(this.tooltipContainer);
         }

         this.tooltipContainer.appendTo(this.tooltipParent).show("fade", this.options.effectSpeed);
      },

      hide: function() {
         var self = this;
         console.log("hide(), this", this);

         if("undefined" === typeof (self.tooltipContainer)) {
            self.tooltipContainer = self.tooltipParent.find("." + this.options.containerClass);
         }

         self.tooltipContainer.hide("fade", this.options.effectSpeed, function() {
            self.tooltipContainer.detach();
         });
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
      effectSpeed: "normal", // The jQuery animation effect speed.
      containerClass: "beeTooltip-container", // The class to add to the tooltip container.
      contentClass: "beeTooltip-content" // The class to add to the tooltip text content.
   };

})(jQuery, window, document);