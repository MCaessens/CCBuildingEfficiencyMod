Game.registerMod("building efficiency mod",{
	init:function()
	{
		Game.Notify(`Building Efficiency mod loaded!`,'Remember the lower the score on efficiency, the better it is to buy!',[16,5]);

		Game.registerHook('draw', [() => this.checkForNewUnlockedUpgrades(), () => this.updateEfficiencies()]);
		// this.addMissedGoldenCookies();
		Game.registerHook('reincarnate', () => this.removeEfficiencyDivs());
		// Game.Loader.Replace('perfectCookie.png',this.dir+'/coolCookie.png');
	},
	save:function()
	{
		return "";
	},
	load:function(str)
	{
	},
	getHtmlString:function(efficiencyScore) {return `<span style="font-size:14px;">Efficiency:</span><span style="font-size:12px"> ${Beautify(efficiencyScore)}</span>`;},
	getEfficiencyScore:function(price, storedCps)
	{
		return Math.round((((price / storedCps) * Game.buyBulk) / 100));
	},
	removeEfficiencyDivs:function(){
		let divs = document.querySelectorAll(".efficiencyDiv");
		divs.forEach(div => div.remove());
	},
	updateEfficiencies:function()
	{
		// let upgradeArray = [];
		for(let upgrade in Game.Objects){
			let price = Game.Objects[upgrade].bulkPrice;
			let storedCps = Game.Objects[upgrade].storedCps;
			// upgradeArray.push({name: upgrade, efficiency: this.getEfficiencyScore(price, storedCps)});
			let div;
			let product = document.querySelector(`#product${Game.Objects[upgrade].id}`);
			if (product.className.includes("unlocked")){
				div = document.querySelector(`#efficiency${Game.Objects[upgrade].id}`);
				div.innerHTML = this.getHtmlString(this.getEfficiencyScore(price,storedCps));
			}
		}
		// upgradeArray = upgradeArray.sort((obj1, obj2) => obj1.efficiency - obj2.efficiency);
		// Game.Objects[upgradeArray[0].name].buy();
	},
	checkForNewUnlockedUpgrades:function()
	{
		for(let upgrade in Game.Objects){
			let price = Game.Objects[upgrade].price;
			let storedCps = Game.Objects[upgrade].storedCps;
			let div = document.querySelector(`#efficiency${Game.Objects[upgrade].id}`);
			let product = document.querySelector(`#product${Game.Objects[upgrade].id}`);
			if (product.className.includes("unlocked") && div === null){
				let newDiv = document.createElement("div");
				newDiv.className = "efficiencyDiv";
				newDiv.id = `efficiency${Game.Objects[upgrade].id}`;
				newDiv.style = "width:300px;height30px;text-align:center;position:relative;font-family:'Merriweather', Georgia,serif;margin:5px 0px;";
				newDiv.innerHTML = this.getHtmlString(this.getEfficiencyScore(price,storedCps));
				let product = document.querySelector(`#product${Game.Objects[upgrade].id}`);
				product.insertAdjacentElement('afterend',newDiv);
			}
		}
	},
	addMissedGoldenCookies:function()
	{
		let subSection = document.querySelector("#menu .subsection");
		let newDiv = document.createElement("div");
		newDiv.innerHTML = `Golden cookies missed: ${Game.missedGoldenClicks}`;
		subSection.append(newDiv);
	}
});