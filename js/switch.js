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
function selectSet(set) {
	document.getElementById("instructions-set").style.display = "none";
	document.getElementById("instructions-tab").classList.remove("selected");
	document.getElementById("training-set").style.display = "none";
	document.getElementById("training-tab").classList.remove("selected");
	document.getElementById("test-set").style.display = "none";
	document.getElementById("test-tab").classList.remove("selected");
	document.getElementById("evaluation-set").style.display = "none";
	document.getElementById("evaluation-tab").classList.remove("selected");

	document.getElementById(set+"-set").style.display = "block";
	document.getElementById(set+"-tab").classList.add("selected");	
}
function addBranch(branch) {
	$('.'+branch).show();
	$('.'+branch+'_invert').hide();
}