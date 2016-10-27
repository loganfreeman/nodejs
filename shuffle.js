	// http://www.hardcode.nl/subcategory_1/article_317-array-shuffle-function
	function shuffle(a) {
		var i=a.length,p,t;
		while (i--) {
			p = Math.floor(Math.random()*i);
			t = a[i];
			a[i]=a[p];
			a[p]=t;
		}
	}
