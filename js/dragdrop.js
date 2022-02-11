var startpos = [];
var pos = null;

var drops = [];

let indexes = [];

var z_index = 1000;

(function () {
  function init() {
    interact(".draggable").draggable({
      snap: {
        targets: [pos],
        range: Infinity,
        relativePoints: [
          { x: 0.5, y: 0.5 }
        ],
        endOnly: true,
      },
      onstart: function (event) {
        var rect = interact.getElementRect(event.target);

        // record center point when starting the very first a drag
        pos = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
        if (startpos[event.target.id] == undefined) {
          console.log(pos)
          startpos[event.target.id] = pos;
        }
        event.interactable.draggable({
          snap: {
            targets: [pos],
          },
        });
      },
      // call this function on every dragmove event
      onmove: function (event) {
        var zi = z_index + 100;
        console.log("zi", z_index);
        var draggableElement = event.target;

        $(draggableElement).css("position", "relative");
        $(draggableElement).css("z-index", zi);
        var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
          y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform = target.style.transform =
          "translate(" + x + "px, " + y + "px)";

        // update the position attributes
        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
        target.classList.add("getting--dragged");
      },
      onend: function (event) {
        event.target.classList.remove("getting--dragged");
      },
    });

    interact(".dropzone").dropzone({
      accept: ".draggable",
      overlap: 0.2,

      ondropactivate: function (event) {
        event.target.classList.add("can--drop");
      }, 
      ondragenter: function (event) {
        console.log("eed", event.relatedTarget.id);
        var draggableElement = event.relatedTarget;
        dropzoneElement = event.target;
        dropRect = interact.getElementRect(dropzoneElement);
        dropCenter = {
          x: dropRect.left + dropRect.width / 2 ,
          y: dropRect.top + dropRect.height / 2 ,
        };

        console.log(draggableElement.classList);

        if (!dropzoneElement.classList.contains("card_dropzone")) {
          
          dropCenter = {
            x:
              (parseFloat(draggableElement.getAttribute("data-x")) || 0) +
              event.dx,
            y:
              (parseFloat(draggableElement.getAttribute("data-y")) || 0) +
              event.dy,
          };
        }
        // dragableH = $(".draggable").height();
        // dragableW = $(".draggable").width();

        // // console.log('dze',dropzoneElement.id);

        // let index = 0;
        // indexes = [];
        // console.log(drops[dropzoneElement.id]);
        // if (drops[dropzoneElement.id] != undefined) {
        //   for (var i = 0; i < 10; i++) {
        //     indexes[i] = 1;
        //   }
        //   for (let [key, value] of Object.entries(drops[dropzoneElement.id])) {
        //     indexes[value] = 0;
        //   }

        //   for (var i = 0; i < 10; i++) {
        //     if( indexes[i] == 1){
        //       index = i;
        //       break;
        //     }
        //   }
        //   console.log("index", index);
        // } else {
        //   let index = 0;
        // }

        // console.info("index", index);

        // dropCenter = {
        //   x: dropRect.left + dragableW / 2 + index * dragableW,
        //   y: dropRect.top + dragableH / 2,
        // };

        // console.log(dropCenter);

        event.draggable.draggable({
          snap: {
            targets: [dropCenter],
          },
        });

        // feedback the possibility of a drop
        dropzoneElement.classList.add("can--catch");
        draggableElement.classList.add("drop--me");
      },
      ondragleave: function (event) {
        // if (drops[event.target.id][event.relatedTarget.id] != undefined) {
        //   delete (drops[event.target.id][event.relatedTarget.id]);
        // }
        console.log("dragleavc", event);
        // remove the drop feedback style
        event.target.classList.remove("can--catch", "caught--it");
        event.relatedTarget.classList.remove("drop--me");
        // // console.log(event.relatedTarget.id);
        event.draggable.draggable({
          snap: {
            targets: [startpos[event.relatedTarget.id]],
          },
        });
      },
      ondrop: function (event) {
        z_index = z_index + 100;

        console.log("sp", startpos[event.relatedTarget.id]);
        var last = startpos[event.relatedTarget.id];

        $("#training-set").append(
          `<card class="draggable drag-drop"></card>`
        );
        $('.draggable').last()
        .css("position" ,"absolute")
        .css("left" ,last.x -$('.draggable').width()/2 -4 )
        .css("top" ,last.y -$('.draggable').height()/2 -9).removeClass('draggable').addClass('dropzone').addClass('card_dropzone')
        ;
        // if (drops[event.target.id] == undefined) {
        //   drops[event.target.id] = [];
        // }
        // drops[event.target.id][event.relatedTarget.id] = Object.keys(drops[event.target.id]).length;
        console.log("Index of dropped node: " + event.target);
        console.log(
          "Index of dragged node: " +
            getNodeIndex(event.relatedTarget.parentNode)
        );
        // event.relatedTarget.textContent = 'Dropped';
        // console.log("Dropped!");
        console.log("related target: " + event.relatedTarget.parentNode);
        // console.log(event.draggable);
        event.target.classList.add("caught--it");
      },
      ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove("can--drop");
        event.target.classList.remove("can--catch");
      },
    });
  }

  function getNodeIndex(node) {
    var index = 0;
    while ((node = node.previousSibling)) {
      if (node.nodeType != 3 || !/^\s*$/.test(node.data)) {
        index++;
      }
    }
    return index;
  }

  function eleHasClass(el, cls) {
    return (
      el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className)
    );
  }

  window.onload = function () {
    init();
  };

  function getsnappos(target) {}
})();

// function getNewZindex(){

//   var max = 0;
//   $('.draggable').each( (i,e)=>{
//     var zi = ($(e).css('z-index'));
//     if (zi > max){
//       max = +zi;
//     }
//   })
//   max = +1000 +max;

//   return max;
//   // console.log(max);

// }
