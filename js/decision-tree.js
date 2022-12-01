/* Decision tree functions */
function onchange() {
	    var condition_a = $('#condition_a');
	    var condition_b = $('#condition_b');
	    condition_b.val(condition_a.val());

	    var condition_la = $('#condition_la');
	    var condition_lb = $('#condition_lb');
	    condition_lb.val(condition_la.val());

	    var condition_ra = $('#condition_ra');
	    var condition_rb = $('#condition_rb');
	    condition_rb.val(condition_ra.val());

	    var condition_lra = $('#condition_lra');
	    var condition_lrb = $('#condition_lrb');
	    condition_lrb.val(condition_lra.val());

	    var condition_rla = $('#condition_rla');
	    var condition_rlb = $('#condition_rlb');
	    condition_rlb.val(condition_rla.val());

	    var condition_lla = $('#condition_lla');
	    var condition_llb = $('#condition_llb');
	    condition_llb.val(condition_lla.val());

	    var condition_rra = $('#condition_rra');
	    var condition_rrb = $('#condition_rrb');
	    condition_rrb.val(condition_rra.val());
}
function updatePredictions() {
	if (predictions["l"]) { predictions["l"].prediction = $('#prediction_box_l').find(":selected").val(); }
	if (predictions["r"]) { predictions["r"].prediction = $('#prediction_box_r').find(":selected").val(); }
    if (predictions["ll"]) { predictions["ll"].prediction = $('#prediction_box_ll').find(":selected").val(); }
    if (predictions["lr"]) { predictions["lr"].prediction = $('#prediction_box_lr').find(":selected").val(); }
    if (predictions["rl"]) { predictions["rl"].prediction = $('#prediction_box_rl').find(":selected").val(); }
    if (predictions["rr"]) { predictions["rr"].prediction = $('#prediction_box_rr').find(":selected").val(); }
    if (predictions["lll"]) { predictions["lll"].prediction = $('#prediction_box_lll').find(":selected").val(); }
    if (predictions["llr"]) { predictions["llr"].prediction = $('#prediction_box_llr').find(":selected").val(); }
    if (predictions["lrl"]) { predictions["lrl"].prediction = $('#prediction_box_lrl').find(":selected").val(); }
    if (predictions["lrr"]) { predictions["lrr"].prediction = $('#prediction_box_lrr').find(":selected").val(); }
    if (predictions["rll"]) { predictions["rll"].prediction = $('#prediction_box_rll').find(":selected").val(); }
    if (predictions["rlr"]) { predictions["rlr"].prediction = $('#prediction_box_rlr').find(":selected").val(); }
    if (predictions["rrl"]) { predictions["rrl"].prediction = $('#prediction_box_rrl').find(":selected").val(); }
    if (predictions["rrr"]) { predictions["rrr"].prediction = $('#prediction_box_rrr').find(":selected").val(); }
    updateConfidence(cards.trainingSet);
}
function addBranch(branch) {
	$('.'+branch).show();
	$('.'+branch+'_invert').hide();
}