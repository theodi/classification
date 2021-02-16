function toggleDrag() {
  // Get the checkbox
  var checkBox = document.getElementById("myCheck");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    document.getElementById("decision-tree-wrapper").classList.add("draggable","drag-drop");
  } else {
    document.getElementById("decision-tree-wrapper").classList.remove("draggable","drag-drop"); 
  }
}
function toggleSet() {
  // Get the checkbox
  var checkBox = document.getElementById("setSwitch");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
  	document.getElementById("training-set").style.display = "none";
    document.getElementById("evaluation-set").style.display = "block";
  } else {
  	document.getElementById("evaluation-set").style.display = "none";
    document.getElementById("training-set").style.display = "block";
  }
}