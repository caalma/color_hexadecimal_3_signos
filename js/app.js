let sig = '0123456789abcdef'.split('');

let listar_colores = function(n){
	if(n == undefined){ n = 3; }
	let col = [];
	let tmp = [];
	for(let i in _.range(n)){
		tmp = [];
		if(_.isEmpty(col)){
			col = sig;
		}else{
			for(let j in col){
				for(let k in sig){
					tmp.push(col[j]+sig[k]);
				}	
			}
			col = tmp;
		}
	}
	return col;
}

let opuesto = function(col){
	let opu = [];
	let sl = sig.length;
	for(let i in col.split('')){
		opu.push(sig[(sig.indexOf(col[i]) + (sl / 2)) % sl]);
	}
	return opu.join('');
}


$(document).ready(function(){
	let variedad = 3;
	let cnt = $('#cnt');
	let tot = $('#tot');
	let tit = $('#tit');

	tit.text(document.title);
	
	let lc = listar_colores(variedad);
	
	_.each(lc, function(col){
		cnt.append(_.template('<li style="background-color:#<%= c %>;border-color:#<%= o %>;color:#<%= o %>"><%= c %></li>')({c:col, o:opuesto(col)}));
	});
	tot.text(_.template('Total de colores: <%= t %>')({t: lc.length}));
});
