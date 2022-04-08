var activeItem = null;
var tilesUsed = [];
var impactsUsed = [];



// $('#buttons').draggable( "disable" )

$('#training-set').sortable({
  group: 'list',
  animation: 200,
  ghostClass: 'ghost',
  onSort: reportActivity,
});

// $('#training-set').sortable({ connectWith: '.container' });

function reportActivity() {
  console.log('The sort order has changed');
};

$("#canvas").droppable({
  accept: ".draggable",

  // hoverClass: "ui-state-hover",
  drop: function (ev, ui) {
  // stop snapping
  ui.draggable.draggable('option', 'snap', false);
  var item = ui.draggable.clone();
  ui.draggable.remove();
  item.appendTo($(this));
      item.draggable({
          connectToSortable: "#sortable1",
      });
  }
});




// function dragStart(e) {
//   if (e.target !== e.currentTarget) {
//     active = true;
//     console.log(e)

//     // this is the item we are interacting with
//     activeItem = e.target;
//     console.log(activeItem)

//     if (activeItem !== null) {
//       if (!activeItem.xOffset) {
//         activeItem.xOffset = 0;
//       }

//       if (!activeItem.yOffset) {
//         activeItem.yOffset = 0;
//       }

//       if (e.type === "touchstart") {
//         activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
//         activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
//       } else {
//         console.log("doing something!");
//         activeItem.initialX = e.clientX - activeItem.xOffset;
//         activeItem.initialY = e.clientY - activeItem.yOffset;
//       }
//     }
//   }
// }


// function dragEnd(e) {
//   if (activeItem !== null) {
//     activeItem.initialX = activeItem.currentX;
//     activeItem.initialY = activeItem.currentY;
//   }

//   active = false;
//   activeItem = null;
// }

// function drag(e) {
//   if (active) {
//     if (e.type === "touchmove") {
//       e.preventDefault();

//       activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
//       activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
//     } else {
//       activeItem.currentX = e.clientX - activeItem.initialX;
//       activeItem.currentY = e.clientY - activeItem.initialY;
//     }

//     activeItem.xOffset = activeItem.currentX;
//     activeItem.yOffset = activeItem.currentY;

//     setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
//   }
// }

// /*Downloaded from https://www.codeseek.co/nicolastilly/drag-andamp-drop-dropzone-interactjs-pdKrKP */
// // target elements with the "draggable" class
// interact(".draggable").draggable({
//   // enable inertial throwing
//   inertia: true,

//   // enable autoScroll
//   autoScroll: true,
  
//   // call this function on every dragmove event
//   onmove: dragMoveListener,
//   // call this function on every dragend event
//   onend: function (event) {},
// });


// function dragMoveListener(event) {
//   var target = event.target;

//   //get max z-index on page
//   var maxZ = Math.max.apply(
//     null,
//     $.map($("body > *"), function (e, n) {
//       if ($(e).css("position") != "static")
//         return parseInt($(e).css("z-index")) || 1;
//     })
//   );
//   // bring to front
//   target.style.zIndex = maxZ + 1;
//   target.style.position = "relative";

//   // keep the dragged position in the data-x/data-y attributes
//   (x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx),
//     (y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy);

//   // translate the element
//   target.style.webkitTransform = target.style.transform =
//     "translate(" + x + "px, " + y + "px)";

//   // update the position attributes
//   target.setAttribute("data-x", x);
//   target.setAttribute("data-y", y);
// }

// // enable draggables to be dropped into this
// interact(".dropzone").dropzone({
//   // Require a 75% element overlap for a drop to be possible
//   overlap: 0.8,

//   // listen for drop related events:

//   ondropactivate: function (event) {
//     // add active dropzone feedback
//     event.target.classList.add("drop-active");
//   },

//   ondragenter: function (event) {
//     var draggableElement = event.relatedTarget,
//       dropzoneElement = event.target;
//   },

//   ondragleave: function (event) {
//     // ...
   
//   },

//   ondragover: function (event) {
//     if (event.target.classList.contains("snapzone")) {
//       console.log("snapzone");
//       var draggableElement = event.relatedTarget,
//       dropzoneElement = event.target;
//       console.log(draggableElement, dropzoneElement)
//     }
//   },
  


//   ondrop: function(event) {
//     if (event.target.classList.contains("snapzone")) {
//       //console.log(event.target)
//       //console.log(event.relatedTarget)
//       var x = event.relatedTarget.getAttribute("data-x");
//       var y = event.relatedTarget.getAttribute("data-y");

//       if (x > 100 || x < 100) {
//         x = Math.round(x / 156) * 156;
//         y = Math.round(y / 229) * 229;
//       }
//       event.relatedTarget.setAttribute("data-x", x);
//       event.relatedTarget.setAttribute("data-y", y);
//       event.relatedTarget.style.webkitTransform =
//         event.relatedTarget.style.transform =
//           "translate(" + x + "px, " + y + "px)";
//     }
    
//   },
  
// });
