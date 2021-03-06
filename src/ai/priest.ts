import { greeting } from "TestModule";
import { return_to_leader, go_heal, check_potion_stock } from "MyLib";

//greeting("TypeScript");
//map_key("1", "snippet", "parent.start_runner();");
//map_key("2", "snippet", "parent.stop_runner();");
//map_key("3", "snippet", 'load_code("' + character.ctype + '")');
//game_log("To reload your code, first press 2 to stop the current AI, and then press 3 to reload the code.");

var attack_mode=true;

let typhos = get_player("TYPHOS");
let zechs = get_player("ZECHS");

//check_potion_stock();
xmove(zechs.x, zechs.y);

setInterval(function(){

	if(character.hp<400 || character.mp<300) use_hp_or_mp();
	// Uses potions only when the above conditions are met
	loot();

	//get party hp
	let typhos = get_player("TYPHOS");
	let zechs = get_player("ZECHS");
	//heal
	let party = [zechs, typhos, character];

	//return_to_leader(character, zechs, 140)

	for (var member in party) {
		let hp_ratio = member.hp / member.max_hp;
		if (hp_ratio < 0.80) {
			game_log("Healing: " + member.name);
			go_heal(member);
		}
	}


	if(!attack_mode || character.moving) return;

	var target=get_targeted_monster();
	if(!target)
	{
		target=get_nearest_monster({min_xp:100,max_att:120,path_check:true,no_target:true});
		// Ensures that your character can walk to the target (path_check) and the target isn't engaging with anyone else (no_target)
		if(target) change_target(target);
		else
		{
			set_message("No Monsters");
			return;
		}
	}

	if(!in_attack_range(target))
	{
		move(
			character.real_x+(target.real_x-character.real_x)/2,
			character.real_y+(target.real_y-character.real_y)/2
			);
		// Walk half the distance
	}
	else if(can_attack(target))
	{
		set_message("Attacking");
		attack(target);
	}

},250);
