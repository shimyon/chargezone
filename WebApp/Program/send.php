<html>
<body>
</body>
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript">
	$(function() {
		for (var i = 0; i < 10; i++) {
			getDatsetData(i, i);
		}
	})

	function getDatsetData(id, content) {
		$.post("http://localhost:90/isquaretaxi/Program/index.php",{"id": id, "content" : content} ,function(el) {
			console.log(el);
		});
	}
</script>
</html>