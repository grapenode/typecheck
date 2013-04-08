<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Typecheck</title>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="src/typecheck.js"></script>
</head>
<body>
	<form>
		<!-- Typecheck; type checks -->
		<input type="text" class="typecheck-required">
		<input type="text" class="typecheck-url">
		<input type="text" class="typecheck-email">
		<input type="text" class="typecheck-date">
		<input type="text" class="typecheck-time">
		<input type="text" class="typecheck-number">
		<!-- Typecheck; numerical checks -->
		<input type="text" class="typecheck-numeric typecheck-max" data-typecheck-max="10">
		<input type="text" class="typecheck-numeric typecheck-min"data-typecheck-min="10">
		<input type="text" class="typecheck-numeric typecheck-eq" data-typecheck-eq="10">
		<input type="text" class="typecheck-numeric typecheck-range" data-typecheck-max="10" data-typecheck-min="0">
		<!-- Typecheck; character checks -->
		<input type="text" class="typecheck-character typecheck-max" data-typecheck-max="10">
		<input type="text" class="typecheck-character typecheck-min"data-typecheck-min="10">
		<input type="text" class="typecheck-character typecheck-eq" data-typecheck-eq="10">
	</form>
	<script>
		$(function() {
			$('form').submit(function(e) {
				e.preventDefault();
				if (Typecheck.run($(this))) {
					$(this).submit();
				}
			});
		});
	</script>
</body>
</html>