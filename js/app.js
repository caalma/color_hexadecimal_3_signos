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

let luminosidad = function(col){
	let rgb = _.map(col.split(''), function(h){ return parseInt((h+h),16)});
	return Math.ceil(0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]);
}

let opuesto_directo = function(col){
	let opu = [];
	let sl = sig.length;
	for(let i in col.split('')){
		opu.push(sig[(sig.indexOf(col[i]) + (sl / 2)) % sl]);
	}
	return opu.join('');
}

let opuesto_luminico = function(col){
	let lum = luminosidad(col);
	let aju = 255/3;
	let opu = lum - aju;
	if(lum < 255/2){
		opu = lum + aju;
	}
	return (opu % 255).toString(16).repeat(3);
}

$(document).ready(function(){
	let variedad = 3;
	let cnt = $('#cnt');
	let tot = $('#tot');
	let tit = $('#tit');

	tit.text(document.title);
	
	let lc = listar_colores(variedad);
	
	_.each(lc, function(col){
		let tex = '<li style="background-color:#<%= c %>;color:#<%= o %>"><%= c %></li>';
		cnt.append(_.template(tex)({c:col, o:opuesto_luminico(col)}));
	});
	tot.text(_.template('Total de colores: <%= t %>')({t: lc.length}));
});
