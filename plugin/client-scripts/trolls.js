miaou(function(mountyhall, locals){

	if ((!locals.room) || !/\[MH\]/i.test(locals.room.description)) {
		mh_trolls = null;
		return;
	}

	var excludeMap = {};
	// removing common names (yes, it looks like they're common on miaou...)
	// but they're still used when searching by number
	[ 
		"ade", "arf", 'autre', "aura",
		"balrog", "beurk", "belle", "bibi", "blabla", "blanche", "bleu", "bof", "bol", "boom", "boum", "boss", "bouarf",
		"caché", "caribou", "cat", "cerne", "champion", 'chonchon', "courte", "crash", "cross",
		"dark", "darkling", "désolé", "diablotin", "dodo", 'don', "dragon", "dudu",
		"fan", "fanatique", "fichtre",
		"glop", "gniark", "gogo", "golem", "gowaps", "gros", "guy",
		"hein ?", "hum", "hypnos", "hypnotiseur",
		"imagine", "inscription", "invi", "ira",
		"kaboum",
		"late", "l'autre", "le troll", "lourd",
		"malus", "mauvais", 'max', "meuh", 'merci', "miam", "mithril", "mini", "moche", 'moi', "monstre", "mort", "mounty", "mumuse", "musaraigne",
		"ninix", "noob", "nos",
		"ombre", "ouille", "oups",
		"paf", "parfait", 'pas', "pâquerette", "pépin", "phoenix", "personne", "poil", "poison", "popo", "poulet", "pourri", "pub",
		"refait", "retrouver", "roc", "rose",
		"salade", "silence", 'son', "songe", "sorcière", "souris", "six", "sphynx", "steack", "sushi", "sympa",
		'test', "titan", "tomawak", 'trolette', 'troll', "trollinet", "trou",
		"vrille",
		"wiki",
		"yop",
		"zog",
		"..."
	].forEach(function(k){
		excludeMap[k] = true;
	});
	mountyhall.trollsById = {};
	var replacer = new Groumf();
	for (var name in mh_trolls) {
		var id = mh_trolls[name];
		mountyhall.trollsById[id] = name;
		if (excludeMap[name.toLowerCase()]) continue;
		if (name==+name) name = 'T'+name;
		if (name.length>2) replacer.add(name, id);
	}
	replacer.skipTags('a', 'code');
	mountyhall.trollNamesReplacer = replacer;

	function alias(){
		var o = arguments[0],
			id = replacer.get(o);
		if (!id) {
			console.log("original for alias not found :", o);
		}
		for (var i=1; i<arguments.length; i++) {
			var a = arguments[i];
			if (replacer.get(a)) {
				console.log('alias prevented :', a);
				continue;
			}
			replacer.add(a, id);
		}
	}
		
	// a few aliases
	alias('canopée', 'canop');
	alias('divadel', 'diva');
	alias('squ@le', 'squale');
	alias('cebolla', 'cébo', 'cebo');
	alias('cirederf', 'cire');
	alias('bob-le-troll', 'blt', 'bobtroll');
	alias('kergrog', 'kerg');
	alias('gogo27', 'g27');
	alias('Gnu Sauvage [Chef de Harde]', 'gnu');
	alias('Gruhtzog', 'grutz');
	alias('schtroumph_vert_pomme', 'svp');
	alias('Shaksgärt', 'Shaks');
	alias('Valfëan', 'Valfean');
	alias('wouchy', 'wouch');

	mh_trolls = null;
});
